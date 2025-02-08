const UserCreditService = require("../services/userCredit.service");

const UserCreditServiceInstance = new UserCreditService();

const saveUserCredit = async (req, res) => {
  try {
    const result = await UserCreditServiceInstance.SaveCredit(req.body.xml);
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create User Credit",
        reason: "Already Exists in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create user credit", error });
    }
  }
};

const getUserCredit = async (req, res) => {
  try {
    const { reportId } = req.params;
    const result = await UserCreditServiceInstance.findCredit(reportId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "User Credit not found!", userId });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user credit", error });
  }
};

module.exports = { getUserCredit, saveUserCredit };
