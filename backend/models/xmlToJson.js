var xml2js = require("xml2js");
var UserCredits = require("./userCredit.model");

const parseXmlToJson = async (xml) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  const result = await parser.parseStringPromise(xml);

  let basicDetails = getBasicDetails(result);
  let accDetails = getAccountDetails(result);
  let acc = getAccounts(result);
  let cScore = getCreditScore(result);
  let last7day = getLast7daysCreditEnquiries(result);

  let extractedData = new UserCredits({
    BasicDetails: {
      Name: basicDetails.First_Name + " " + basicDetails.Last_Name,
      MobilePhone: basicDetails.MobilePhoneNumber,
      PAN: acc[0].CAIS_Holder_Details.Income_TAX_PAN,
      credit: cScore,
    },
    ReportSummary: {
      TotalAccounts: parseInt(accDetails.Credit_Account.CreditAccountTotal),
      ActiveAccounts: parseInt(accDetails.Credit_Account.CreditAccountActive),
      ClosedAccounts: parseInt(accDetails.Credit_Account.CreditAccountClosed),
      CurrentBalance: parseInt(
        accDetails.Total_Outstanding_Balance.Outstanding_Balance_All
      ),

      SecuredAccountsAmount: parseInt(
        accDetails.Total_Outstanding_Balance.Outstanding_Balance_Secured
      ),
      UnsecuredAccountsAmount: parseInt(
        accDetails.Total_Outstanding_Balance.Outstanding_Balance_UnSecured
      ),
      Last7daysCreditEnquiries: last7day,
    },
    CreditAccountsInformation: {
      CreditCards: getArrayOfValues(acc, "Identification_Number"),
      BanksOfCreditCards: getArrayOfValues(acc, "Subscriber_Name"),
      Addresses: getAddArrayOfValues(acc, "CAIS_Holder_Address_Details"),
      AccountNumbers: getArrayOfValues(acc, "Account_Number"),
      AmountOverdue: getArrayOfValues(acc, "Amount_Past_Due"),
      CurrentBalance: getArrayOfValues(acc, "Current_Balance"),
    },
  });
  return extractedData;
};
const getAddArrayOfValues = (arr, key) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key]) res.push(getAddressObj(arr[i][key]));
  }
  return res;
};
const getAddressObj = (xml) => {
  return {
    line1: xml.First_Line_Of_Address_non_normalized,
    line2: xml.Second_Line_Of_Address_non_normalized,
    line3: xml.Third_Line_Of_Address_non_normalized,
    city: xml.City_non_normalized,
    state: xml.State_non_normalized,
    zip: xml.ZIP_Postal_Code_non_normalized,
    countryCode: xml.CountryCode_non_normalized,
  };
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
