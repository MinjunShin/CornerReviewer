const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  getAccessToken: (userInfo) => {
    // just make a access token
    const data = {
      id: userInfo.id,
      email: userInfo.email,
      createdAt: userInfo.createdAt,
    };

    const aToken = sign(data, process.env.ACCESSKEY, {
      expiresIn: "24h",
    });
    return aToken;
  },

  sendAccessToken: (res, token) => {
    res.cookie("access_token", token, {
      httpOnly: true,
      // secure option은 https적용 후
    });
  },

  verifyToken: async (req, res) => {
    // check login session
    // eslint-disable-next-line dot-notation
    // const aToken = req.headers["authorization"];
    const userId = req.params.userId;
    const aToken = req.cookies.access_token;

    if (!aToken)
      // token이 없는 경우
      return res.status(400).send({ message: "Missing Authentication Token" });

    // const token = aToken.split(" ")[1];

    return verify(aToken, process.env.ACCESSKEY, (err, decode) => {
      if (err) {
        const response = { isValid: false, data: err };
        return response;
      }
      if (userId !== decode.id) {
        return { isValid: false, data: { name: "Unauthorized" } };
      }

      const response = { isValid: true, data: decode };
      return response;
    });
  },
};
