const checkIfEmail = (email = "") => {
  const checkIfEmailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return checkIfEmailRgx.test(email);
};

module.exports = { checkIfEmail };
