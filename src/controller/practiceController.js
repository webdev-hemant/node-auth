const { handleErrors } = require("../handleErrors");
const { inputUserModel } = require("../model/practiceModel/inputUserModel");

const addToDatabase = async (req, res) => {
  try {
    const {
      name,
      roles: { basic, advance },
    } = req.body;

    const schema = new inputUserModel({ name, roles: { basic, advance } });

    const response = await schema.save();

    res.json({ message: "query successfully!", response });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

const getAllPractice = async (req, res) => {
  try {
    const getAll = await inputUserModel.find();
    res.json({
      message: "its working!",
      getAll,
    });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

const tryAllQueries = async (req, res) => {
  try {
    // const {
    //   name,
    //   roles: { basic, advance },
    // } = req.body;

    // const schema = new inputUserModel({ name, roles: { basic, advance } });

    // const response = await schema.save();
    const newres = await inputUserModel.where("age").gte("24");

    res.json({ message: "query successfully!", newres });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

module.exports = { addToDatabase, getAllPractice, tryAllQueries };
