const router = require("express").Router();
const { movies } = require("../models");
router.get("", async (req, res) => {
  const startIdx = (await movies.max("apiIdx")) + 1;
  console.log(startIdx);
});

module.exports = router;
