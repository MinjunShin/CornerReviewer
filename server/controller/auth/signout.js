module.exports = async (req, res) => {
  return res.status(200).send({ message: "successfully signed out!" });
};
