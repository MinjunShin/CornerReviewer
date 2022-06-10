/* eslint-disable no-unused-vars */
// const bcrypt = require("bcrypt");
// const { getAccessToken, sendAccessToken } = require("../tokenFunction");
const { users } = require("../../models");
const getGenres = require("../../modules/getGenres");
const insertUserGenre = require("../../modules/insertUserGenre");
const bycryp = require("bcrypt");
module.exports = async (req, res) => {
  const { userId, password, email, genre } = req.body;

  // pw enctypt
  const salt = await bycryp.genSalt(10);
  const pw = await bycryp.hash(password, salt);

  // create user

  const [uesrInfo, created] = await users.findOrCreate({
    where: { id: userId, email },
    defaults: { pw, salt },
  });

  try {
    // 만약 uerid나 email이 이미 존재하면
    if (!created)
      return res.status(409).send({ message: "ID or email already exists" });
    // 아니라면
    if (genre.length) {
      getGenres(genre, res)
        .then((genreEty) => {
          insertUserGenre(genreEty, userId, null);
        })
        .then(() => res.status(200).send({ message: "successfully created!" }));
    } else return res.status(200).send({ message: "successfully created!" });
  } catch (err) {
    console.error(err);
  }
};
