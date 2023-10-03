const { Schema, SchemaType, model } = require("mongoose");

const inputSchema = new Schema({
  name: {
    type: String,
  },
  age: Number,
  roles: {
    basic: [String],
    advance: [{ access: [String] }],
  },
});

const inputUserModel = model("practice", inputSchema);

module.exports = { inputUserModel };
