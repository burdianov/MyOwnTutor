const {usernameExists, emailExists} = require("./User_DB");

async function validateUserExists(username, email) {
  if (!username || !email) {
    throw new Error("Invalid number of args passed. Please pass username and email");
  }
  let validUsername = null;
  let validEmail = null;
  if (username) {
    validUsername = await usernameExists(username);
  }
  if (email) {
    validEmail = await emailExists(email);
  }
  if (validUsername && validEmail) {
    return validUsername;
  } else {
    return null;
  }
}

module.exports = {
  validateUserExists
};