const {
  usernameExists,
  emailExists,
  createUser
} = require("./User_DB");

const validateUserExists = async (username, email) => {
  if (!username || !email) {
    throw new Error("Invalid number of args passed. Please pass username and email");
  }
  let takenValidUsername = null;
  let takenValidEmail = null;
  if (username) {
    takenValidUsername = await usernameExists(username);
  }
  if (email) {
    takenValidEmail = await emailExists(email);
  }
  if (takenValidUsername) {
    return takenValidUsername;
  }
  if (takenValidEmail) {
    return takenValidEmail;
  }
  return null;
};

const createNewUser = async (args) => {
  return await createUser(args);
};

module.exports = {
  validateUserExists,
  createNewUser
};