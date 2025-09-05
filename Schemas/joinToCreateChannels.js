const { model, Schema } = require("discord.js");

let jointocreatechannels = new Schema({
  Guild: String,
  User: String,
  Channel: String,
});

module.exports = model("jointocreatechannels", jointocreatechannels);
