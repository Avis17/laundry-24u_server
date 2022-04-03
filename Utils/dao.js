const Mongo = require("mongodb");
const { MongoClient, ObjectId } = Mongo;
var uri = "mongodb://localhost:27017";
var db;

// const uri = "mongodb+srv://kuat-incubator:Kuat1234@cluster0.duyn5.mongodb.net/kuat-incubation?retryWrites=true&w=majority";

let connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      uri,
      { useUnifiedTopology: true, useNewUrlParser: true },
      function (err, dbInstance) {
        if (err) return reject(err);
        db = dbInstance.db("laundry-24u");
        return resolve("laundry-24u");
      }
    );
  });
};

let query = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.find(query).toArray((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let insert = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.insert(data, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let update = (collectionName, query, udpateData) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    console.log(collection);
    collection.updateOne(query, udpateData, (err, result) => {
      console.log(err, result);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let deleteItem = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.remove(query, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let incrementinvoice = (collectionName, query, udpateData) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    // console.log("coming");
    collection.updateOne({"_id":new ObjectId(query)}, {$set:udpateData}, (err, result) => {
      // console.log(err, result);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

let updateInvoice = (collectionName, udpateData) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    // console.log("coming");
    collection.updateOne({name:'invoice'}, {$set:udpateData}, (err, result) => {
      // console.log(err, result);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  connect,
  query,
  insert,
  update,
  deleteItem,
  updateInvoice,
  incrementinvoice,
  ObjectId,
};
