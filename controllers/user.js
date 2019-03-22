
module.exports = (passport, app, User) => {

  app.get('/auth/google', passport.authenticate('google',
    {
      scope: ['profile', 'email'],
      callbackURL : '/auth/google/callback',
      accessType: 'offline',
      prompt: 'consent'
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google', {
      callbackURL : '/auth/google/callback'
    }), (req, res) => {
     if(req.user.name){
       res.redirect('/dashboard');
     }else{
       User.findById(req.user._id).then((user) => {
         user.admin = true;
         user.save().then(() => {
           res.redirect('/dashboard');
         });
       })
     }
    }
  );



  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })

  app.post('/api/user/setup', (req, res) => {
    User.findById(req.user._id).then((user) => {
      if (req.body.name && req.body.phone) {
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.firstVisit = false;
        user.save().then(() => {
          res.send({status: 'success', message: 'Your account details have been saved!'});
        })
      } else {
        res.send({status: 'error', message: 'Error: Please fill out all required fields'});
      }
    }).catch((err) => {
      console.log(err);
    })
  })

}
