const { users, genresUsers } = require("../../models");
const { verifyToken } = require("../tokenFunction");
const bycryp = require("bcrypt");

module.exports = async (req, res) => {
  const userInfo = {};
  const { password, email, genre } = req.body.userInfo;
  const id = req.params.userId;
  try {
    // pw를 변경했다면 암호화를 진행한다.
    if (password) {
      // pw enctypt
      const salt = await bycryp.genSalt(10);
      const pw = await bycryp.hash(password, salt);
      userInfo.pw = pw;
    }

    if (email) {
      userInfo.email = email;
    }

    return verifyToken(req, res).then(async (response) => {
      if (response.isValid) {
        // update to ueer table
        await users.update(userInfo, { where: { id } });

        // genre가 있다면
        if (genre) {
          console.log(genre);
          // genresUsers table에서 uerId 사용자의 장르 중 genreName이 스릴러인 것을 수정한다.
          Promise.all(
            genre.after.map(async (aft, idx) => {
              await genresUsers.update(
                { genreName: aft },
                { where: { userId: id, genreName: genre.before[idx] } },
              );
            }),
          );
        }

        // update genresUsers

        return res.status(200).send({
          message: "successfully changed!",
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).senc({ message: "Internal server error" });
  }
};

/**
 * token을 확인한다
 * 사용자가 맞다면 데이터를 수정한다 - user table
 * genresUsers tabel도 수정한다
 *
 * 만약 장르다 다 차있다면 update를 한다
 * 장르가 다 차있지 않지만 기존의 장르를 수정한다면
 *
 */
