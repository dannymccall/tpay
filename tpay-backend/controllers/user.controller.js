const { SomeFunctions } = require("../somefunctions");
const PhoneModel = require("../models/phones.model");
const Card = require("../models/idCard.model");
let somefunctions = new SomeFunctions();
let codeGenerated = "";

exports.RegisterUser = async (req, res) => {
  const { number, authfunction } = req.body;

  // console.log({ code });
  // console.log(phoneNumber)
  try {
    const phoneNumber = await somefunctions.genPhoneNumber(number);
    const registeredPhone = await PhoneModel.find({ phone: phoneNumber });
    console.log({ registeredPhone });
    if (registeredPhone.length && authfunction === "register") {
      return res.json({
        success: false,
        message: "Please number already exists!!!",
      });
    }
    const verificationCode = somefunctions.generateVerificationCode();
    codeGenerated = verificationCode;

    // const response = await somefunctions.sendSms(
    //   phoneNumber,
    //   `Your verification code is ${verificationCode}`
    // );
    return res.json({ success: true, verificationCode, phoneNumber });
  } catch (err) {
    console.log(err)
    return res.json({
      err,
    });
  }
};

exports.VerifyCode = async (req, res) => {
  const { number, code, verificationCode, authfunction } = req.body;
  let genId;
  let verified;
  try {
    if (code !== verificationCode)
      return res.json({
        success: false,
        message: "Code is incorrect!!!",
      });

    if (authfunction === "register") {
      genId = somefunctions.genTpayId();
      const newPhoneRegistration = new PhoneModel({
        phone: number,
        tpayid: genId,
      });

      const savedPhoneRegistration = await newPhoneRegistration.save();
      verified = savedPhoneRegistration.verified

      if (!savedPhoneRegistration)
        return res.json({
          success: false,
          message: "Registration wasn't successfull!!!",
        });
    } else {
      const registeredNumber = await PhoneModel.findOne({ phone: number });
      console.log({ registeredNumber });
      genId = registeredNumber.tpayid;
      verified = registeredNumber.verified;
    }

    const accessToken = await somefunctions.createTokens(
      number,
      process.env.secrete
    );

    return res.json({
      success: true,
      message:
        authfunction === "register"
          ? "Registration Successfull"
          : "Login Successfull",
      number,
      genId,
      accessToken,
      verified,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
};

exports.GetUserDetails = async (req, res) => {
  const { tpayid } = req.query;
  const user = await PhoneModel.findOne({ tpayid });
  return res.json({
    success: true,
    user,
  });
};
exports.VerifyIDCardNumber = async (req, res) => {
  const { idNumber, tpayid } = req.body;
  console.log({ idNumber, tpayid });
  try {
    const cardDetails = await Card.findOne({ idnumber: idNumber });
    if (!cardDetails) return res.json({ success: false, cardDetails });

    const phone = await PhoneModel.findOne({ tpayid });
    if (phone) {
      phone.verified = true;
      await phone.save();
      return res.json({ success: true, cardDetails });
    }
  } catch (r) {
    res.json({ success: false, e });
  }
};
