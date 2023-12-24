const { Double } = require('mongodb');
const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    tpayid: {
        type:String,
        required: [true, 'Please enter tpayid'] 
    },

    loanamount: {
        type: Number,
        required:[true, 'Pease enter loan amount'],
    },

    duration: {
        type: Number,
        required: [true, 'Please enter duration']
    },

    loantype:{
        type:String,
        required:[true, 'Please enter loan type']
    },
    loanstatus: {
        type: String,
        default: 'pending'
    },
    status:{
        type: String,
        default: 'owing'
    }
},
{
    timestamps: true
}
)


module.exports = mongoose.model('Loan', LoanSchema)