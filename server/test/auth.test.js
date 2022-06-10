const app = require("../index");
const request = require("supertest");
const expect = require("chai").expect;

const userInfo = {
  id: "sorakang",
  email: "sora@google.com",
  createdAt: "2022-04-05 16:25:24",
};

describe("post /users/signin", () => {
  it("When password is wrong, message include Wrong user password", async () => {
    const response = await request(app).post("/users/signin").send({
      userId: "sorakang",
      password: "1234",
    });
    expect(response.body.message).to.eql("Wrong user password");
  });

  it(" When id is wrong, message inclued Wrong user id", async () => {
    const response = await request(app).post("/users/signin").send({
      userId: "wrongId",
      password: "sora",
    });
    expect(response.body.message).to.eql("Wrong user id");
  });

  it("When user id and password is correct with data stored in database, accessToken should be in cookie", async () => {
    const response = await request(app).post("/users/signin").send({
      userId: "sorakang",
      password: "sora",
    });

    const accessTokenisExists = response.headers["set-cookie"].some((cookie) =>
      cookie.includes("access_token"),
    );
    expect(accessTokenisExists).to.eql(true);
  });

  it("When user id and password is correct with data stored in database, message inclued login success!!", async () => {
    const response = await request(app).post("/users/signin").send({
      userId: "sorakang",
      password: "sora",
    });
    expect(response.body.message).to.eql("login success!!");
  });
});

describe("post /users/signout", () => {
  it("When user logged out, message include successfully signed out! ", async () => {
    const response = await request(app).post("/users/signout").send({
      userId: "sorakang",
      password: "sora",
    });
    expect(response.body.message).to.eql("successfully signed out!");
  });
});

describe("post /users/signin", () => {
  it("When id or email already exists, message inclued ID or email already exists.", async () => {
    const response = await request(app)
      .post("/users/signup")
      .send({
        userId: "sorakang",
        password: "sora",
        email: "sora@google.com",
        genre: ["comedy", "action"],
      });
    expect(response.body.message).to.eql("ID or email already exists");
  });

  it("When user info created and stored in database, message includesuccessfully created!", async () => {
    const response = await request(app)
      .post("/users/signup")
      .send({
        userId: "soratest",
        password: "test",
        email: "test@google.com",
        genre: ["comedy", "action"],
      });
    expect(response.body.message).to.eql("successfully created!");
  });
});
