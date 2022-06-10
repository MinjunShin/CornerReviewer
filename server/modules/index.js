const { users, genres } = require("../models");

module.exports = {
  findById: async (userId, ...attrs) => {
    // find by id and set attributes if exist
    if (!attrs.length) attrs = [];
    return await users.findOne({ where: { id: userId }, attributes: attrs });
  },
  createUser: async (id, pw, email, ...genre) => {
    await users.create({ id, pw, email });

    // if usesr defined genre is exist
    // n:m 관계인 장르에 대해 조금 더 고민이 필요
  },
};
