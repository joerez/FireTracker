const compound = require('compound-interest')


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
      user.takeHomePay = req.body.takeHomePay;
      user.totalSavings = req.body.totalSavings;
      user.totalInvested = req.body.totalInvested;
      user.monthlySavings = req.body.monthlySavings;
      user.monthlyInvested = req.body.monthlyInvested;
      user.monthlyExpenses = req.body.monthlyExpenses;
      user.location = req.body.location;
      user.birthYear = req.body.birthYear;
      user.desiredRetirementAge = req.body.desiredRetirementAge;
      user.currentDebt = req.body.currentDebt;
      user.monthlyDebtPayment = req.body.monthlyDebtPayment;

      user.monthlyInvestedData = req.body.monthlyInvestedData;

      const previousSavingsValue = req.body.totalSavings;
      let newSavingsValue = 0;

      const previousInvestedValue = req.body.totalInvested

      user.monthlySavingsData = getUserSavingsData(previousSavingsValue, newSavingsValue, user.monthlySavings)
      user.monthlyInvestedData = getUserSavingsData(previousInvestedValue, newSavingsValue, user.monthlyInvested)
      user.monthlyNetworthData = getUserNetworthData(previousSavingsValue, newSavingsValue, user.monthlySavings, user.monthlyInvested, user.totalInvested)
      user.monthlyRetirementData = user.monthlyNetworthData.map((monthlyNetworth) => {
        return Math.floor(monthlyNetworth *= .04);
      })
      user.debtFreeData = getDebtFreeData(user.currentDebt, user.monthlyDebtPayment)

      const currentYear = new Date().getFullYear()

      const opts = {
        initial: parseInt(user.totalInvested),
        monthly: parseInt(user.monthlyInvested),
        interest: 8,
        compound: 1,
        years: parseInt(user.desiredRetirementAge - (currentYear - user.birthYear))
      };

      user.yearlyRetirementData = compound.verbose(opts);

      user.firstVisit = false;
      user.save().then(() => {
        res.send({status: 'success', message: 'Your account details have been saved!'});
      })


    }).catch((err) => {
      console.log(err);
    })
  })

  app.post('/api/user/retire-age', (req, res) => {
    User.findById(req.user._id).then((user) => {
      console.log(user);
      const currentYear = new Date().getFullYear()
      console.log(req.body.yearlyAge)
      user.desiredRetirementAge = req.body.yearlyAge;

      const opts = {
        initial: user.totalInvested,
        monthly: user.monthlyInvested,
        interest: 8,
        compound: 1,
        years: parseInt(user.desiredRetirementAge - (currentYear - user.birthYear))
      };

      user.yearlyRetirementData = [];
      user.yearlyRetirementData = compound.verbose(opts);
      user.save().then(() => {
        res.send({status: 'success', message: 'Your account details have been saved!'});
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  })

  function getUserSavingsData(prevValues, newValues, savings) {
    let monthlySavingsData = []
    for (let i = 0; i < 13; i++) {

      newValues = parseInt(prevValues) + parseInt(savings);

      monthlySavingsData.push(newValues);

      prevValues = newValues;
    }

    return monthlySavingsData;
  }

  function getDebtFreeData(currentDebt, debtPayment) {
    let debtData = [];
    while (currentDebt > 0) {
      currentDebt -= debtPayment;
      debtData.push(currentDebt)
    }
    return debtData;
  }

  function getUserNetworthData(prevValues, newValues, savings, monthlyInvestments, currentInvestments) {
    let monthlyNetworthData = [];
    prevValues += currentInvestments;
    for (let i = 0; i <13; i++) {
      newValues = parseInt(prevValues) + parseInt(savings) + parseInt(monthlyInvestments);

      monthlyNetworthData.push(newValues);

      prevValues = newValues;
    }
    return monthlyNetworthData;
  }

}
