const signupModel = require("../model/authModel/signupModel");
const { handleErrors } = require("../handleErrors");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/allEnv");

const signupController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      roles = ["basic"],
      email,
      password,
    } = req.body;
    if (!email || !password || !firstName || !lastName || !dob) {
      return res.status(400).json({ message: "all fields are required." });
    }

    const newUser = await signupModel.create({
      firstName,
      lastName,
      dob,
      roles,
      email,
      password,
    });

    res.send({ message: "user successfully registered!", newUser });
  } catch (error) {
    res.status(500);
    handleErrors(error, req, res);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  const foundUser = usersDB.users.find(({ username }) => username === email);
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    // Saving refreshToken with current user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { signupController, loginController };
