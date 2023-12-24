//const bcrypt = require("bcrypt");
//const { Vonage } = require("@vonage/server-sdk");
const { sign, verify } = require("jsonwebtoken");

class SomeFunctions {
  constructor() {}

  async genPhoneNumber(number) {
    const countryCode = "+233";
    let numberArray;
    let newNumber;
    let fullNumber;
    if (number.length == 10) {
      numberArray = Array.from(number);

      newNumber = numberArray.shift();

      newNumber = numberArray.join("");

      fullNumber = countryCode + newNumber;

      return fullNumber;
    } else {
      return;
    }
  }

  async hashPassword(password) {
    const saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
  genVoucher() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@!/";

    let length = 10;

    let voucher = "";
    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * characters.length);
      voucher += characters.substring(randomNumber, randomNumber + 1);
    }
    return voucher;
  }
  async comparePasswords(password, hashedPassword) {
    const passwordMatch = await bcrypt.compare(hashedPassword, password);

    return passwordMatch;
  }
   generateVerificationCode() {
    let length = 4;

    let code = "";

    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * 10);

      code += randomNumber;
    }

    return code;
  }

  async sendSms(number,  message) {
    // const phoneNumber = await this.genPhoneNumber(number);
    // console.log(phoneNumber);
    const accountSid = "AC3c1a2d99a687431a2e9032f6f19b5767";
    const authToken = "8554957f2d8243a9115fcde1ebd53cc0";
    console.log("hello");
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({
        body: message,
        from: "+16462333626",
        to: number,
      })
      .then("Message sent successfully")
      .catch((error) => console.log(error));
  }

  genTpayId() {
    let COMPANY_CODE = "14421";
    let length = 5;
    let tpayid=COMPANY_CODE
    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * 10);

      tpayid += randomNumber;
    }

    return tpayid;
  }

  createTokens(obj, secret) {
    const accessToken = sign({ data: obj }, secret);

    return accessToken;
  }

  auth(secret, accessToken) {
    const verified = verify(accessToken, secret);

    return verified;
  }

  genAccountNumber() {
    let COMPANY_CODE = "14421";
    let length = 5;
    let accountNumber = COMPANY_CODE;
    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * 10);

      accountNumber += randomNumber;
    }

    return accountNumber;
  }

  checkValidAccountNumber(number) {
    let numberArray = Array.from(number);
    let booleanArray = [];

    numberArray = numberArray.map(Number);

    numberArray.forEach((element) => {
      if (isNaN(element)) {
        booleanArray.push(false);
      } else {
        booleanArray.push(true);
      }
    });
    console.log(booleanArray);

    if (booleanArray.includes(false)) {
      return false;
    } else {
      return true;
    }
  }
}
module.exports = { SomeFunctions };
//  const some = new SomeFunctions();
// console.log(some.genVoucher());
