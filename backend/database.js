const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/mynotebook";

const connectToMongo =  async ()=>
{
  try {
    await mongoose.connect(mongoURI);
    console.log("Connecteed!");
  } catch (error) {
    console.log("faild");
  }
}


module.exports = connectToMongo;