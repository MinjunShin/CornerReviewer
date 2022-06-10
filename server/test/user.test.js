const app = require("../index");
const request = require("supertest");
const expect = require("chai").expect;

const { sign } = require("jsonwebtoken");

describe("Get users/:userId", () => {
  const tokenData = {
    id: "sorakang",
    email: " sora@google.com",
    createdAt: "2022-04-05 16:25:24",
  };
  const aToken = sign(tokenData, process.env.ACCESSKEY);

  it("If user data is sent successfully, status code 200 and response included user information", async () => {
    const response = await await request(app)
      .get("/users/sorakang")
      .set("Cookie", `access_token=${aToken}`)
      .expect(200);

    expect(response.body).to.exist;
    expect(Object.keys(response.body)).to.eql([
      "userId",
      "email",
      "profilepath",
      "createdAt",
      "updatedAt",
      "genre",
      "userReviewList",
    ]);
    
    
      it("When access token is valid but user id is not matched, message include User id Unauthorized with status code 401 ", async () => {
    const response = await await request(app)
      .get("/users/invalidUserid")
      .set("Cookie", `access_token=${aToken}`)
      .expect(401);
       expect(response.body.message).to.eql("User id is Unauthorized");
  });

       it("If wrong token in Cookie, message include Missing Authentication Token", async () => {
    const response = await request(app).get("/users/sorakang").expect(400);
    expect(response.body.message).to.eql("Missing Authentication Token");
  });
});
        
        