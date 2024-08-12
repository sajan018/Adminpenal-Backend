const { default: mongoose } = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
  Email:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model("adminUser", AdminUserSchema);
