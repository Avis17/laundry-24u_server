var MongoClient = require("mongodb").MongoClient;
var mongo = require("mongodb");
const url = "mongodb+srv://kuat-incubator:Kuat1234@cluster0.duyn5.mongodb.net/kuat-incubation?retryWrites=true&w=majority";
var db;
const nodemailer = require("nodemailer");

exports.findandupdate = function (req, res) {
  try {
    let category = req.body.category;
    let reqdata = req.body.data;
    console.log(category);
    // console.log(question)
    if (
      category == undefined ||
      category == "" ||
      question == undefined ||
      question == ""
    )
      throw "invalid";
    if (
      category != "students" &&
      category != "faculty"
    ) {
      throw "invalid";
    }

    try {
      MongoClient.connect(url, function (dberr, db) {
        if (dberr) throw dberr;
        var dbo = db.db("kuat-incubation");
        let newData = [];
        dbo
          .collection(category)
          .find({}).sort({"createdAt":-1})
          .toArray((err, res11) => {
            if (err) {
              res
                .status(500)
                .send({ data: "Error in adding new "+category, error: err });
              return;
            }
            if (res11) {
              let id = res11[0]._id;
              let update = {
                data: reqdata
              };
              dbo
                .collection(category)
                .updateOne(
                  { _id: ObjectId(id) },
                  { $set: update },
                  function (err, ress1) {
                    if (err) {
                      res
                        .status(500)
                        .send({
                          data: "Error in adding new data",
                          error: err,
                        });
                      return;
                    }
                    res.send({
                      status: 200,
                      data:
                        "new question is addded successfully for " + category,
                    });
                    return;
                  }
                );
            }
          });
      });
    } catch (error) {
      responseMessage = {
        status: error,
        errorMessage: "Internal Server error",
      };
      res.send(responseMessage);
      return;
    }
  } catch (error) {
    res.send({
      data: "invalid status",
      status: "failed",
    });
    return;
  }
};

let query = (collectionName, query) => {
    return new Promise((resolve, reject) => {
      try {
        MongoClient.connect(url, function (dberr, db) {
          if (dberr) throw dberr;
          var dbo = db.db("kuat-incubation");
          let collection = dbo.collection(collectionName);
          collection.find(query).sort({"createdAt":-1}).toArray((err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      } catch (error) {
        return reject({msg:"Internal Server error"+collectionName,err:error});
      }
    });
  };
  
  let insertMany = (collectionName, data) => {
    return new Promise((resolve, reject) => {
      try {
        MongoClient.connect(url, function (dberr, db) {
          if (dberr) throw dberr;
          var dbo = db.db("kuat-incubation");
          let collection = dbo.collection(collectionName);
          collection.insertMany(data, (err, result) => {
            if (err) return reject({msg:"Error in adding new data for "+collectionName,err:err});
            return resolve(result);
          });
        });
      } catch (error) {
        return reject({msg:"Internal Server error"+collectionName,err:error});
      }
    });
  };
  let insertOne = (collectionName, data) => {
    return new Promise((resolve, reject) => {
      try {
        MongoClient.connect(url, function (dberr, db) {
          if (dberr) throw dberr;
          var dbo = db.db("kuat-incubation");
          let collection = dbo.collection(collectionName);
          collection.insertOne(data, (err, result) => {
            if (err) return reject({msg:"Error in adding new data for "+collectionName,err:err});
            return resolve(result);
          });
        });
      } catch (error) {
        return reject({msg:"Internal Server error"+collectionName,err:error});
      }
    });
  };
  
  let login = (collectionName, data) => {
    return new Promise((resolve, reject) => {
      try {
        MongoClient.connect(url, function (dberr, db) {
          if (dberr) throw dberr;
          var dbo = db.db("kuat-incubation");
          let collection = dbo.collection(collectionName);
          collection.findOne(data)
          .then(result => {
            if(result) {
              return resolve({status:200, login:true, user:result});
            } else {
              return reject({status:"failure", login:false});            }
          })
          .catch(err => console.error(`Failed to find document: ${err}`));
        });
      } catch (error) {
        return reject({msg:"Internal Server error"+collectionName,err:error});
      }
    });
  };

  let update = (collectionName, query, udpateData) => {
    return new Promise((resolve, reject) => {
      try {
        MongoClient.connect(url, function (dberr, db) {
          if (dberr) throw dberr;
          var dbo = db.db("kuat-incubation");
          let collection = dbo.collection(collectionName);
          collection.updateOne(query, {$set:udpateData}, (err, result) => {
            console.log(err, result);
            if (err) return reject(err);
            return resolve({status:200, result:result});
          });  
        });
      } catch (error) {
        return reject({msg:"Internal Server error"+collectionName,err:error});
      }
    });
  };
  
  let deleteItem = (collectionName, query) => {
    return new Promise((resolve, reject) => {
      try {
        MongoClient.connect(url, function (dberr, db) {
          if (dberr) throw dberr;
          var dbo = db.db("kuat-incubation");
          let collection = dbo.collection(collectionName);
          collection.deleteOne(query, (err, result) => {
            if (err) return reject(err);
            return resolve({status:200, result:result});
          });
        });
      } catch (error) {
        return reject({msg:"Internal Server error"+collectionName,err:error});
      }
    });
  };

  let addSyllabus = (collectionName, reqData,coursename) => {
    return new Promise((resolve, reject) => {
      try {
        MongoClient.connect(url, function (dberr, db) {
          if (dberr) throw dberr;
          var dbo = db.db("kuat-incubation");
          let collection = dbo.collection(collectionName);
          collection.updateOne({name:coursename}, {$set:{syllabus:reqData}}, (err, result) => {
            if (err) return reject(err);
            return resolve({status:200, result:result});
          });  
        });
      } catch (error) {
        return reject({msg:"Internal Server error"+collectionName,err:error});
      }
    });
  };

  let sendmail = async (name, email)=>
  {
  
    // create reusable transporter object using the default SMTP transport
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "kuattechnologies@gmail.com",
        pass: "Kuat@2021"
      }
    });
    
     // send mail with defined transport object
  let info = await transport.sendMail({
    from: '"KUAT Technologies" <kuattechnologies@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello "+name.toUpperCase() +' ✔' + Date.now(), // Subject line
    text: `Thank you for your interest in our KUAT Technologies. We are excited to hear from you. In response to your enquiry, our admin team will get back to you soon.
    However, please do not hesitate to contact us for further clarification if need be.`,
     // plain text body
    html: `<b> Thank you for your interest in our KUAT Technologies. We are excited to hear from you. In response to your enquiry, our admin team will get back to you soon.
    However, please do not hesitate to contact us for further clarification if need be. </b>
     <br>
      <div style="'margin-top':'20px'">
        <span>----- do not reply -------</span><br>
      </div>`, 
  });


  
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return resolve({status:200, result:result});
}

  module.exports = {
    query,
    insertOne,
    insertMany,
    update,
    deleteItem,
    login,
    sendmail,
    addSyllabus
  };