const mongoose = require("mongoose");

const userCreditSchema = new mongoose.Schema({
  BasicDetails: {
    Name: { type: String, default: "" },
    MobilePhone: { type: String, default: "" },
    PAN: { type: String, default: "" },
    CreditScore: { type: Number, default: 0 },
  },
  ReportSummary: {
    TotalAccounts: { type: Number, default: 0 },
    ActiveAccounts: { type: Number, default: 0 },
    ClosedAccounts: { type: Number, default: 0 },
    CurrentBalance: { type: Number, default: 0 },
    SecuredAccountsAmount: { type: Number, default: 0 },
    UnsecuredAccountsAmount: { type: Number, default: 0 },
    Last7daysCreditEnquiries: { type: Number, default: 0 },
  },
  CreditAccountsInformation: {
    CreditCards: { type: Array, default: [] },
    BanksOfCreditCards: { type: Array, default: [] },
    Addresses: { type: Array, default: [] },
    AccountNumbers: { type: Array, default: [] },
    AmountOverdue: { type: Array, default: [] },
    CurrentBalance: { type: Array, default: [] },
  },
});

const userCreditModel = mongoose.model("UserCredits", userCreditSchema);
module.exports = userCreditModel;
