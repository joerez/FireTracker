const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name : String,
  googleId : String,
  accessToken : String,
  refreshToken : String,
  phone : String,
  email : String,
  admin : { type: Boolean, default: false },
  firstVisit : { type: Boolean, default: true },
  currentOccupation: String,
  annualIncome: Number,
  totalSavings: Number,
  totalInvested: Number,
  netWorth: Number,
  monthlySavings: Number,
  monthlyInvested: Number,
  annualSavings: Number,
  annualInvested: Number,
  monthlyExpenses: Number,
  yearlyExpenses: Number,
  location: String,
  timeUntilRetirement: String,
  desiredRetirementAge: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;
