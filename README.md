### Stay Fit ###

* Stay Fit is a simple web based application written in Javascript with Node.js. The application uses Node, Express, Sequelize, Bootstrap, and jQuery. It is intended to be a visualization of pertinent health data that is related to staying fit and losing or maintaining weight.

Currently the data being used in the rendering of all charts and information on the home page is demo data from Human API's endpoints. I felt this would be easier for those viewing the project. However, all functionality for actually connecting your own data exists and if you wish to test this out you have two options:
1. checkout the second to last commit
2. go into public/javascripts/home-ajax-calls.js and remove "demo" from the end of each route and replace it with the variable accessToken which is defined on line 2.

### How do I get set up? ###

* Set up should be relatively easy. First please clone down the repo.
* Secondly please make sure you have SQlite3 installed as this project makes use of it as the database. You can download it here [SQlite Download Page](http://www.sqlite.org/download.html)
* You will also need a developer account with [Human API](https://humanapi.co/)
* With those things taken care of, we are almost ready!
* While all node modules should be installed already, to make sure please navigate to the project's home directory and run "npm install" in your terminal. 
* In order to start up the project you need to set an environment variable for your client secret from Human API. This is simple enough and is taken care of upon starting up the application.
* To start the application please run "CLIENT_SECRET=<your_secret_here> npm start" in your terminal in the home directory of the project.
* All that is left is to navigate to localhost:3000 and check it out!


### Who do I talk to? ###

* Travis Gibson [Email Me](mailto:travis.gibson75@gmail.com)