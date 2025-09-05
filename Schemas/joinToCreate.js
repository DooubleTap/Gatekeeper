const { model, Schema } = require("discord.js");

let jointocreate = new Schema({
  Guild: String,
  Channel: String,
  Category: String,
  VoiceLimit: Number,
});

module.exports = model("joinToCreate,", jointocreate);
