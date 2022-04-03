
const admin = require("./APIs/admin")
const students = require("./APIs/students")
const faculty = require("./APIs/faculty")
const website = require("./APIs/website");
const {ObjectId} = require('mongodb');  
const  Razorpay = require('razorpay');
const  shortID = require('shortid');
const mongodb = require("./Utils/dao");

var razorpay = new Razorpay({
  key_id: 'rzp_test_QbsFmZSnoGXvpF',
  key_secret: 'D4OFV9dBmJitiNaNraoNoBbC',
});

module.exports = function(app) { 
  app.post("/v1/api/webapp", function (req, res){
    
  })

}




