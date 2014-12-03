var options = {
  clientUserId: encodeURIComponent(window.location.href.split("?value=")[1]),
  clientId: 'a6c9050c81952cedd6286ce672b2c7d5f668cd95',
  finish: function(err, sessionTokenObject) {
    console.log(sessionTokenObject)

    $.post('/humanInfo', sessionTokenObject, function(res){
      existOptions.publicToken = res.token
      console.log(existOptions)
    });
  },
  close: function() {

  },
  error: function(err) {

  }
}