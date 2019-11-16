const {usernameExists, emailExists} = require("./User_DB");

async function validateUserExists(username, email) {
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
  if (takenValidUsername && takenValidEmail) {
    return takenValidUsername;
  } else {
    return null;
  }
}

module.exports = {
  validateUserExists
};