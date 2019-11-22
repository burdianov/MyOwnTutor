const {expect} = require("chai");
const {
  usernameExists,
  emailExists,
  createUser
} = require("../../Services/Users/User_DB");
const db = require("../../models");

describe("User DB Test Suite", () => {
  it("should see if a username already exists in db", async () => {
    const check = await usernameExists("");
    expect(check).to.be.null;
    expect(check === undefined).to.be.false;
    expect(check === false).to.be.false;
  });

  it("should throw an error because no username was passed", async () => {
    try {
      const check = await usernameExists();
    } catch (e) {
      expect(e).to.be.an("Error");
      expect(e.message).to.equal("No username was passed as an argument");
    }
  });

  it("should create a user, see if username already exists, and fail", async () => {
    const test = await createDummyUser();

    const check = await usernameExists("test_test");
    expect(check).to.be.an("object");

    await destroyDummyUser(test)
  });

  it("should see if an email already exists in db", async () => {
    const check = await emailExists("");
    expect(check).to.be.null;
    expect(check === undefined).to.be.false;
    expect(check === false).to.be.false;
  });

  it("should throw an error because no email was passed", async () => {
    try {
      const check = await emailExists();
    } catch (e) {
      expect(e).to.be.an("Error");
      expect(e.message).to.equal("No email was passed as an argument");
    }
  });

  it("should create a user, see if email already exists, and fail", async () => {
    const test = await createDummyUser();

    const check = await emailExists("test@test.com");
    expect(check).to.be.an("object");

    await destroyDummyUser(test)
  });

  it("should create a new user", async () => {
    const first_name = "test";
    const last_name = "test";
    const email = "test@test.com";
    const password = "test_test";
    const username = "test_test";
    const permission_id = 1;

    const args = {
      first_name,
      last_name,
      email,
      password,
      username,
      permission_id
    };
    const user = await createUser(args);

    await user.destroy({force: true});

    expect(user).to.be.an("object");
    expect(user.first_name).to.equal(first_name);
    expect(user.last_name).to.equal(last_name);
    expect(user.email).to.equal(email);
    expect(user.password).to.equal(password);
    expect(user.username).to.equal(username);
    expect(user.permission_id).to.equal(permission_id);
  });

  it("should throw an error because no username is passed", async () => {
    try {
      const first_name = "test";
      const last_name = "test";
      const email = "test@test.com";
      const password = "test_test";
      const permission_id = 1;

      const user = await createUser({
        first_name,
        last_name,
        email,
        password,
        permission_id
      });
    } catch (e) {
      expect(e).to.be.an("Error");
      expect(e.message).to.equal("Invalid argument: username");
    }
  });

  it("should throw an error because no first_name is passed", async () => {
    try {
      const username = "test";
      const last_name = "test";
      const email = "test@test.com";
      const password = "test_test";
      const permission_id = 1;

      const user = await createUser({
        last_name,
        email,
        username,
        password,
        permission_id
      });
    } catch (e) {
      expect(e).to.be.an("Error");
      expect(e.message).to.equal("Invalid argument: first_name");
    }
  });

  it("should throw an error because no last_name is passed", async () => {
    try {
      const first_name = "test";
      const username = "test";
      const email = "test@test.com";
      const password = "test_test";
      const permission_id = 1;

      const user = await createUser({
        first_name,
        email,
        username,
        password,
        permission_id
      });
    } catch (e) {
      expect(e).to.be.an("Error");
      expect(e.message).to.equal("Invalid argument: last_name");
    }
  });

  it("should create a user and assign it permission id of 2 as default", async () => {
    const first_name = "test";
    const last_name = "test";
    const username = "test";
    const email = "test@test.com";
    const password = "test_test";

    const user = await createUser({
      first_name,
      last_name,
      username,
      email,
      password
    });

    await user.destroy({force: true});

    expect(user).to.be.an("object");
    expect(user.first_name).to.equal(first_name);
    expect(user.last_name).to.equal(last_name);
    expect(user.email).to.equal(email);
    expect(user.password).to.equal(password);
    expect(user.username).to.equal(username);
    expect(user.permission_id).to.equal(2);
  });
});

async function createDummyUser() {
  return await db.user.create({
    first_name: "test",
    last_name: "test",
    username: "test_test",
    password: "test_test",
    email: "test@test.com",
    permission_id: 1
  });
}

async function destroyDummyUser(user) {
  return await user.destroy({force: true});
}