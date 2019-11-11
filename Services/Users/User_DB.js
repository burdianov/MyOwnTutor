const db = require("../../models");

/*
Function checks if username already exists in database
Returns true if username already taken, false otherwise.
 */
async function usernameExists(username) {
  const user  = await db.user.findOne({
    where: {username}
  });
  if (user) {
    return user;
  } else {
    return false;
  }
}

module.exports = {usernameExists};