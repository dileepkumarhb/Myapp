const User = require('./models/user');
// const keys = require('./config/config');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID ="975401623291-qpjhfov86p7ka7bcpnh4hqk5cc1b955a.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";



passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
     function (accessToken, refreshToken, profile, cb) {
      // console.log('accessToken',accessToken)
      // console.log('refreshToken',refreshToken)
      // console.log('profile',profile)
      // console.log('cb',cb)
      User.findOne({googleId:profile.id})
      .then((existingUser)=>{ 
        if(existingUser){
          cb(null,existingUser)
        }else{
           new User({googleId:profile.id}).save()
// new User.findOrCreate({
//       userName:profile.userName,
//       email:profile.email,
//       avatar:profile.avatar,
//       password:profile.password,
//       // filename:profile.filename
//     }).save().then((user)=>{
//       cb(null,user);
//     })
        }
      })
    
  })

);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      done(err, user._id);
  });
});