/**
 * user login, loggut, signin, user infor
 */
const bcrypt = require("bcrypt");
const { getAccessToken, sendAccessToken } = require("../tokenFunction");
const { users } = require("../../models");

module.exports = async (req, res) => {
  const { userId, password } = req.body;

  // check client input
  if (!userId) {
    return res.status(404).send({ message: "Wrong user id" });
  }
  if (!password) {
    return res.status(404).send({ message: "Wrong user password" });
  }

  // db조회
  const userInfo = await users.findOne({ where: { id: userId } });

  try {
    // user infor check
    if (!userInfo) return res.status(404).send({ message: "Wrong user id" });
    if (!bcrypt.compareSync(password, userInfo.dataValues.pw))
      return res.status(404).send({ message: "Wrong user password" });

    // if user infio is valid make token
    const token = getAccessToken(userInfo.dataValues);
    sendAccessToken(res, token);
    return res.status(200).send({ message: "login success!!" });
  } catch (err) {
    return res.status(500).json({ message: " Internal server Error" });
  }
};
