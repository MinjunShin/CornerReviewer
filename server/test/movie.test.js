/* eslint-disable no-undef */
// const expect = require("chai").expect;
const app = require("../index");
const request = require("supertest");
require("dotenv").config();
const expect = require("chai").expect;
const { sign } = require("jsonwebtoken");
const getMovieapi = require("../modules/getMovieapi");

// const nation = "%대한민국%미국%영국%대만%중국%일본";
const nation = encodeURI(`%대한민국`);
const api = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&nation=${nation}&ServiceKey=Y1F9JY52213P85WA8P4E`;

describe("get /", () => {
  it("When client request movie list, ststus code should be 200", (done) => {
    request(app).get("/").expect(200);
    done();
  });
});

describe("get movie list api", () => {
  it("When request success, it should have data ", (done) => {
    // const response = request(app).get(`${api}`);
    const res = getMovieapi(0);
    console.log(res);
    // expect(response.body);
    done();
  });
});

describe("get /movies:movieId", () => {
  it("Upon successful import of movie details and review data, response included movieInfo", async () => {
    const response = await request(app).get("/movies/1");
    const movieInfo = response.body.data.movieInfo;
    expect(movieInfo).to.exist;
    expect(Object.keys(movieInfo)).to.eql([
      "id",
      "title",
      "titleEng",
      "directorName",
      "actorName",
      "releaseDate",
      "posterImg",
      "plot",
      "runtime",
      "rating",
      "startIdx",
      "apiIdx",
      "genre",
      "createdAt",
      "updatedAt",
    ]);
  });

  it("Upon successful import movie data and reviews, message include successfully completed", async () => {
    const response = await request(app).get("/movies/1");
    expect(response.body.message).to.eql("successfully completed");
  });

  it("When movie id is not exist, message include Internal Server Error", async () => {
    const response = await request(app).get("/movies/9999999999");
    expect(response.body.message).to.eql("Internal Server Error");
  });
});

describe("post /movies/:movieId/users/:userId", () => {
  it("If wrong token in authorization header, message include Missing Authentication Token", async () => {
    const response = await request(app).post("/movies/3/users/sorakang").send({
      movieScore: 5,
      comment: "AWS 언제 d구축하지..",
    });
    expect(response.body.message).to.eql("Missing Authentication Token");
  });

  // JsonWebTokenError , EXPIRED_TOKEN test 코드 필요

  it("When review is created and send to the client successfully, message include successfully created", async () => {
    tokenData = {
      id: "sorakang",
      email: " sora@google.com",
      createdAt: "2022-04-05 16:25:24",
    };
    const aToken = sign(tokenData, process.env.ACCESSKEY);
    const response = await request(app)
      .post("/movies/3/users/sorakang")
      .set("Cookie", `access_token=${aToken}`)
      .send({
        movieScore: 5,
        comment: "AWS 언제 구축하지..",
      });
    expect(response.body.message).to.eql("successfully created");
  });
});
