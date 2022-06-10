const { users, reviews, genresUsers } = require("../../models");
const createUserReviewList = require("../../modules/createUserReviewList");
const { verifyToken } = require("../tokenFunction");

module.exports = async (req, res) => {
  const userId = req.params.userId;
  const response = { userId };

  try {
    verifyToken(req, res).then(async (resp) => {
      if (resp.isValid) {
        // get user info
        await users
          .findOne({
            where: { id: userId },
            attributes: ["userImg", "email", "createdAt", "updatedAt"],
          })
          .then((userinfo) => {
            const user = userinfo.dataValues;
            response.email = user.email;
            response.profilepath = user.userImg;
            response.createdAt = user.createdAt;
            response.updatedAt = user.updatedAt;
          });

        // get user genres
        await genresUsers
          .findAll({
            where: { userId },
            attributes: ["genreName"],
          })
          .then((genreList) => {
            const grs = [];
            genreList.forEach((gr) => grs.push(gr.dataValues.genreName));
            return grs;
          })
          .then((list) => (response.genre = list));

        // make user review list
        const reviewList = await reviews.findAll({ where: { userId } });

        await createUserReviewList(reviewList).then(
          (userReviewList) => (response.userReviewList = userReviewList),
        );

        return res.status(200).send(response);
      }

      if (resp.data.name === "JsonWebTokenError")
        return res.status(401).send({ message: "Invalid token" });
      if (resp.data.name === "TokenExpiredError")
        return res.status(401).send({ message: "EXPIRED_TOKEN" });
      if (resp.data.name === "Unauthorized")
        return res.status(401).send({ message: "User id is Unauthorized" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

/**
 * user 정보를 uers table에서 쿼리한다 - email, createdat, updatedat,profilepath 취득
 * user가 선택한 장르를 genresUsers table에서 쿼리한다 - 배열로출력
 * user가 작성한 review를 쿼리한다 - reviaewid, movieid,  movie score - 배열롭 출력
 * 각 review데이터에 있는 movieid를 통해 movies table에서 poster url을 가져온다.
 *
 */
