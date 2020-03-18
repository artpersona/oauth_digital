const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login',(req, res)=>{
    res.render('login', {user: req.user});
});

// auth logout
router.get('/logout',(req, res)=>{
    // handle with passport
    // res.send('logging out');
    req.logout();
    res.redirect('/');
});

// auth with google
router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}));

// auth with facebook
// router.get('/facebook',passport.authenticate('facebook',{
//     scope: ['profile']
// }));
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/github',
  passport.authenticate('github'));

router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
  });
  
// callback route for google to redirect to
router.get('/google/callback',passport.authenticate('google'),(req, res)=>{
    //res.send('you reached the callback URI');
    //res.send(req.user);    
    res.redirect('/profile/');
});

router.get('/facebook/callback',passport.authenticate('facebook'),(req, res)=>{
    res.redirect('/profile/');
});

router.get('/github/callback',passport.authenticate('github'),(req, res)=>{
    res.redirect('/profile/');
});

router.get('/linkedin/callback',passport.authenticate('linkedin'),(req, res)=>{
    //res.send('you reached the callback URI');
    //res.send(req.user);    
    res.redirect('/profile/');
});

module.exports = router;