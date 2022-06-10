const { reviews } = require("../../models");
const { verifyToken } = require("../tokenFunction");

module.exports = async (req, res) => {
  const { movieId, userId } = req.params;
  const { movieScore, comment } = req.body;

  try {
    // access token 여부 확인
    return verifyToken(req, res).then((response) => {
      if (response.isValid) {
        reviews.create({ comment, movieScore, userId, movieId });
        return res.status(200).send({
          message: "successfully created",
        });
      }
      if (response.data.name === "JsonWebTokenError")
        return res.status(401).send({ message: "Invalid token" });
      if (response.data.name === "TokenExpiredError")
        return res.status(401).send({ message: "EXPIRED_TOKEN" });
      if (response.data.name === "Unauthorized")
        return res.status(401).send({ message: "Uesr id is Unauthorized" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

/*

*/
