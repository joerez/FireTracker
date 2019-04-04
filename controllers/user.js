
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
      if (!req.body.name || !req.body.phone || !req.body.totalSavings || !req.body.totalInvested || !req.body.birthYear || !req.body.desiredRetirementAge) {
        res.send({status: 'error', message: 'Error: Please fill out all required fields'});
      }

      user.name = req.body.name;
      user.phone = req.body.phone;
      user.currentOccupation = req.body.currentOccupation;
      user.annualIncome = req.body.annualIncome;
      user.totalSavings = req.body.totalSavings;
      user.totalInvested = req.body.totalInvested;
      user.monthlySavings = req.body.monthlySavings;
      user.monthlyInvested = req.body.monthlyInvested;
      user.monthlyExpenses = req.body.monthlyExpenses;
      user.location = req.body.location;
      user.birthYear = req.body.birthYear;
      user.desiredRetirementAge = req.body.desiredRetirementAge;

      user.monthlyNetworthData = req.body.monthlyNetworthData;
      user.monthlyInvestedData = req.body.monthlyInvestedData;

      let previousSavingsValue = req.body.totalSavings;
      let newSavingsValue = 0;
      let monthlySavingsData = []
      for (let i = 0; i < 13; i++) {

        newSavingsValue = parseInt(previousSavingsValue) + parseInt(req.body.monthlySavings);

        monthlySavingsData.push(newSavingsValue);

        previousSavingsValue = newSavingsValue;
      }

      user.monthlySavingsData = monthlySavingsData;


      user.firstVisit = false;
      user.save().then(() => {
        res.send({status: 'success', message: 'Your account details have been saved!'});
      })


    }).catch((err) => {
      console.log(err);
    })
  })

}
