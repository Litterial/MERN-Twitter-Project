
var tweetID=require('mongodb').ObjectId; //creates an id for a element
var express = require('express');
var router = express.Router();
var TwitterUser=require('../models/TwitterSchema');
// var tweetID=require('mongodb').ObjectId; //creates an id for a element

var bCrypt = require('bcrypt-nodejs'); // used to hash paswords
var passport = require('passport'); //middleware for authentication
var LocalStrategy = require('passport-local').Strategy;

// Initialize Passport and restore cookie data, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

//Serialization is the process of turning an object in memory into a stream of bytes so you can do stuff send it the database.
passport.serializeUser(function(user, done) {

  done(null, user._id);
});

// Deserialization is the reverse process: turning a stream of bytes into an object in memory

passport.deserializeUser(function(id, done) {
  TwitterUser.findById(id, function(err, user) {
    done(err, user);
  });
});

//pasword is entered password, user.password is actual password
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};
// cyript passowrd
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.get('/', function(req, res, next) {
  console.log(req.session.username);
  TwitterUser.findOne({username:req.session.username},(err,results)=>
  {
    err ? res.send(err): res.send(results)
  })
});

// creates a tweet for a user
router.post('/tweets',(req,res)=>
{
  TwitterUser.findOneAndUpdate({username:req.session.username},{$push:{tweets:{message:req.body.message,image:req.body.image,private:req.body.private,_id:new tweetID()}}},(err,results)=>
  {
    console.log(`id:${req.body}`);
    err ? res.send(err):res.send('added')
  })
});





// This is the "strategy" for signing up a new user
passport.use('signup', new LocalStrategy({
      passReqToCallback : true
    },
    //req is request of the route that called the strategy
    //username and password are passed by passport by default
    //done is the function to break to end the strategy(callback function)
    function(req, username, password, done) {
      console.log("0");
      findOrCreateUser = function(){
        // find a user in Mongo with provided username
        TwitterUser.findOne({username:username},function(err, user) {
          // In case of any error return
          if (err){
            console.log("1");
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log("2");
            console.log('User already exists');
            return done(null, false,
                // req.flash('message','User Already Exists')
                { message: 'User already exists.' }
            );
          } else {
            console.log("3");
            // if there is no user with that email
            // create the user
            var newUser = new TwitterUser();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.image = req.body.image;
            newUser.background = req.body.background;

            // save the user
            newUser.save(function(err) {
              if (err){
                console.log("4");
                console.log('Error in Saving user: '+err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };

      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    })
);

router.post('/register', passport.authenticate('signup', { failureRedirect:'/users/failregister',}),
    (req,res)=>
    {
        res.send(`${req.body.username} was created`)
    });

router.get('/failregister',(req,res)=>
{
  res.send('User not created')
});


// This is the "strategy" for checking for an existing user
passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("Local Strat");
      TwitterUser.findOne({ username: username }, function (err, user) {
        if (err) { console.log("1");
          return done(err); }
        if (!user) {
          console.log("2");
          return done(null, false, { message: 'Incorrect username/password.' });
        }
        if (!isValidPassword(user, password)) {
          console.log("3");
          return done(null, false, { message: 'Incorrect username/password.' });
        }
        console.log("4");
        console.log(user);
        return done(null, user, { user: user.username });
      });
    }
));

router.post('/login',passport.authenticate('local',{failureRedirect:'/users/faillogin'}),
    (req,res)=>
    {
      console.log(req.body);
      req.session.username=req.body.username;
      res.send(`${req.body.username} is logged in`)
    });

router.get('/faillogin',(req,res)=>
{
  res.send('Incorrect Username/Password')
});


router.get('/logout', (req, res, next) => {
  console.log(req.session);
  // Clearing the session (cookie) to get rid of the saved username
  req.session = null;
  console.log(req.session);

  res.send("logged out")
});
// router.get('/')
module.exports = router;
