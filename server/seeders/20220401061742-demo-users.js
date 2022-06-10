"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("reviews", [
      {
        id: 1,
        comment:
          "백엔드는 재밌지만 이 영화는 재미없다 사실 본적이 없다. 하지만 백엔드는 재밌지만 ERROR가 자꾸 생신다",
        movieScore: 5,
        userId: "sorakang",
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        comment:
          "10번 봄 이런 영화는 처음입니다 킹받잼~. 제 점수는요 1점입니단",
        movieScore: 1,
        userId: "cornerreviewer",
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        comment:
          "프론트엔드는 마치 돌을 깎는 것과 같다. 하루 6시간 코딩하면 5시간 30분을 CSS와 싸우고 있어야 한다. 마치 PPT에서 텍스트 박스 눈알빠지게 바라보며 정렬하는 것과 다를 바가 없다.",
        movieScore: 3,
        userId: "smj1234",
        movieId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
