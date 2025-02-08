const userCredits = require("../models/userCredit.model");
const xmlParser = require("../models/xmlToJson");

class UserCreditService {
  SaveCredit = async (xml) => {
    try {
      const newData = await xmlParser(xml);
      const result = await newData.save();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  findCredit = async (docId) => {
    try {
      const user = await userCredits.findOne({ _id: docId });
      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserCreditService;
