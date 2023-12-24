const Loan = require("../models/loans.model");
const PhoneModel = require("../models/phones.model");
const { SomeFunctions } = require("../somefunctions");
const Gift = require("../models/gifts.model");
const somefunctions = new SomeFunctions();

exports.RequestLoan = async (req, res) => {
  const { tpayid, loantype, loanamount } = req.body;
  const loanObj = new Loan({
    tpayid,
    loanamount,
    duration: 7,
    loantype,
  });

  try {
    const newLoan = await loanObj.save();
    if (newLoan) {
      const registeredPhone = await PhoneModel.findOne({ tpayid });
      registeredPhone.loanstatus = "Approved";
      await registeredPhone.save();
      await somefunctions.sendSms(
        registeredPhone.phone,
        "Please your loan request has been approved"
      );
      return res.json({ success: true, newLoan });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false });
  }
};

exports.getloan = async (req, res) => {
  const { tpayid } = req.query;
  try {
    const loan = await Loan.findOne({ tpayid, status: "owing" });
    if (loan) return res.json({ success: true, loan });
  } catch (e) {
    return res.json({ success: false });
  }
};

exports.payOffLoan = async (req, res) => {
  const { tpayid } = req.body;
  try {
    console.log({ tpayid });
    const loan = await Loan.findOne({ tpayid });
    const registeredPhone = await PhoneModel.findOne({ tpayid });
    loan.status = "paid";
    const paidLoan = await loan.save();
    if (paidLoan) {
      // await somefunctions.sms(
      //   registeredPhone.phone,
      //   "Your loan payment has been successfull"
      // );

      let dateDifferenceInTime = loan.updatedAt - loan.createdAt;
      let dateDifferenceInDays = Math.round(
        dateDifferenceInTime / (1000 * 3600 * 24)
      );
      console.log({ dateDifferenceInTime, dateDifferenceInDays });

      if (dateDifferenceInDays <= Number(loan.duration)) {
        let voucher = somefunctions.genVoucher();
        const gift = new Gift({
          tpayid,
          gift: "airpods",
          voucher,
        });
        await gift.save();
        return res.json({
          success: true,
          message:
            "You have won 100 points for paying off loan on time which enables you to win a free voucher for a gift, please redeem your voucher to know your gift",
        });
      }

      return res.json({
        success: true,
        message: "Your loan payment has been successful",
      });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false });
  }
};

exports.getGift = async (req, res) => {
  const { tpayid } = req.query;
  try {
    const gift = await Gift.findOne({ tpayid, redeemed: false });

    return res.json({ success: true, gift });
  } catch (e) {
    console.log(e);
    return res.json({ success: false });
  }
};

exports.redeemGift = async (req,res) => {
  const { tpayid, voucher } = req.body;
  console.log(tpayid,voucher)
  try {
    const gift = await Gift.findOne({ tpayid, voucher, redeemed: false });
    console.log({gift})
    gift.redeemed = true;
    await gift.save();
    if(gift) return res.json({ success: true, gift });
    return res.json({ success: false })
  } catch (e) {
    return res.json({ success: false });
  }
};
