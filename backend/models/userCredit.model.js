const mongoose = require("mongoose");

const userCreditSchema = new mongoose.Schema({
  BasicDetails: {
    Name: { type: String, default: "" },
    MobilePhone: { type: String, default: "" },
    PAN: { type: String, default: "" },
    CreditScore: { type: String, default: "" },
  },
  ReportSummary: {
    TotalAccounts: { type: Number, default: 0 },
    ActiveAccounts: { type: Array, default: [] },
    ClosedAccounts: { type: Array, default: [] },
    CurrentBalance: { type: Number, default: 0 },
    SecuredAccountsAmount: { type: Number, default: 0 },
    UnsecuredAccountsAmount: { type: Number, default: 0 },
    Last7daysCreditEnquiries: { type: Array, default: [] },
  },
  CreditAccountsInformation: {
    CreditCards: { type: Array, default: [] },
    BanksOfCreditCards: { type: Array, default: [] },
    Addresses: { type: Array, default: [] },
    AccountNumbers: { type: Array, default: [] },
    AmountOverdue: { type: Number, default: 0 },
    CurrentBalance: { type: Number, default: 0 },
  },
});

const userCreditModel = mongoose.Model("UserCredits", userCreditSchema);
module.exports = userCreditModel;
