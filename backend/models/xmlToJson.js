var xml2js = require("xml2js");

const parseXmlToJson = async (xml) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(xml);

  let basicDetails = getBasicDetails(result);
  let accDetails = getAccountDetails(result);
  let acc = getAccounts(result);

  let extractedData = {
    Name: basicDetails.First_Name + " " + basicDetails.Last_Name,
    MobilePhone: basicDetails.MobilePhoneNumber,
    PAN: basicDetails.IncomeTaxPan,
    credit: getCreditScore(result),
    TotalAccounts: accDetails.Credit_Account.CreditAccountTotal,
    ActiveAccounts: accDetails.Credit_Account.CreditAccountActive,
    ClosedAccounts: accDetails.Credit_Account.CreditAccountClosed,
    CurrentBalance:
      accDetails.Total_Outstanding_Balance.Outstanding_Balance_All,
    SecuredAccountsAmount:
      accDetails.Total_Outstanding_Balance.Outstanding_Balance_Secured,
    UnsecuredAccountsAmount:
      accDetails.Total_Outstanding_Balance.Outstanding_Balance_UnSecured,
    Last7daysCreditEnquiries: getLast7daysCreditEnquiries(result),

    CreditCards: getArrayOfValues(acc, "Identification_Number"),
    BanksOfCreditCards: getArrayOfValues(acc, "Subscriber_Name"),
    Addresses: getArrayOfValues(acc, "CAIS_Holder_Address_Details"),
    AccountNumbers: getArrayOfValues(acc, "Account_Number"),
    AmountOverdue: getArrayOfValues(acc, "Amount_Past_Due"),
    CurrentBalance: getArrayOfValues(acc, "Current_Balance"),
  };
  return extractedData;
};

const getLast7daysCreditEnquiries = (xml) =>
  parseInt(xml.INProfileResponse.TotalCAPS_Summary.TotalCAPSLast7Days);
const getCreditScore = (xml) =>
  parseInt(xml.INProfileResponse.SCORE.BureauScore);
const getBasicDetails = (xml) =>
  xml.INProfileResponse.Current_Application.Current_Application_Details
    .Current_Applicant_Details;

const getAccountDetails = (xml) =>
  xml.INProfileResponse.CAIS_Account.CAIS_Summary;
const getAccounts = (xml) =>
  xml.INProfileResponse.CAIS_Account.CAIS_Account_DETAILS;

const getArrayOfValues = (arr, key) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key]) res.push(arr[i][key]);
  }
  return res;
};

module.exports = parseXmlToJson;
