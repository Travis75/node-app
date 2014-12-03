var models = require('../models');
var express = require('express');
var bcrypt = require('bcrypt');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.session.loggedIn === undefined){
    res.render('index')
  } else {
    // find user. If they have connected to Human API send the public token, if not just send email in query string.
    models.User.find({where: {session: req.session.loggedIn}}).success(function(user){
      var string = encodeURIComponent(user.dataValues.email)
      models.HumanApi.find({where: {UserId: user.dataValues.id}}).success(function(api){
          res.redirect('/home/?value=' + string + "?value=" + api.dataValues.publicToken + "?value=" + api.dataValues.accessToken)
        }).error(function(err){
          res.redirect('home/?value=' + string)
        })
    })
  }
});
// create user
router.post("/register", function(req, res){
  var exists = models.User.find({where: {email: req.body.email}}).success(function(user){
    if ((!user) && (req.body.email.length >= 3) && (req.body.password.length >= 3)) {
      var hash = bcrypt.hashSync(req.body.password, 10);
      var emailHash = bcrypt.hashSync(req.body.email, 10)
      models.User.create({ email: req.body.email, password: hash, session: emailHash})
      req.session.loggedIn = emailHash;
      var string = encodeURIComponent(req.body.email)
      res.redirect('/')
    }
    res.redirect('/')
  })
})

router.post('/login', function(req, res){
  models.User.find({where: {email: req.body.email}}).success(function(user){
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
        req.session.loggedIn = user.dataValues.session
        var string = encodeURIComponent(req.body.email)
        // find user. If they have connected to Human API send the public token, if not just send email in query string.
        models.HumanApi.find({where: {UserId: user.dataValues.id}}).success(function(api){
          res.redirect('/home/?value=' + string + "?value=" + api.dataValues.publicToken + "?value=" + api.dataValues.accessToken)
          res.end()
        }).error(function(err){
          res.redirect('home/?value=' + string)
        })
      }
    } else {res.redirect('/')}
  })
})

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/')
})

router.get('/home/?', function(req, res){
  models.User.find({where: {session: req.session.loggedIn}}).success(function(user){
    if (req.session.loggedIn === user.dataValues.session){
      res.render('home', {email: user.dataValues.email})
    }
  })
})

// receive data from Human API. Need to add client secret to the data and then post back to Human API to receive credentials for the individual user. Data is then being saved to HumanApi table. The Sequelize set function kept throwing errors and wouldn't save in the database so I hacked around it by manually entering in the user id foreign key.
router.post("/humanInfo", function(req, res){
  var firstResponse = res
  models.User.find({where: {session: req.session.loggedIn}}).success(function(user){
    var sessionTokenObject = req.body
    sessionTokenObject.clientSecret = process.env.CLIENT_SECRET
    request({
       method: 'POST',
       uri: 'https://user.humanapi.co/v1/connect/tokens',
       headers: {
        'Content-Type': 'application/json'
        },
       json: sessionTokenObject
     }, function(err, res, body) {
         if(err) return res.send(422);
         models.HumanApi.create({humanId: body.humanId, accessToken: body.accessToken, publicToken: body.publicToken, UserId: user.dataValues.id}).success(function(api){
          console.log(api)
          firstResponse.json({token: api.dataValues.publicToken})
         })
    });
  })
})

module.exports = router;

