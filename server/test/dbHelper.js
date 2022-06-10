/* eslint-disable no-undef */
/**
 * db connection test
 */

const mysql = require("mysql2");
// const expect = require("chai").expect;
// const dotenv = require("dotenv").config();

// db connection test
let connection;
// eslint-disable-next-line no-undef
describe("Dtabase Connection", () => {
  before((done) => {
    connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_USERNAME,
      database: "test",
    });
    connection.connect(done);
  });

  beforeEach((done) => {
    // db가 존재하는지 확인. 없다면 생성
    connection.query(`CREATE DTABASE IF NOT EXIT testDB;
    USE testDB;`);
    // make schma
    connection.query(
      `CREATE TABLE users (
        id varchar(255) ,
        pw varchar(255),
        salt varchar(255),
        userImg varchar(255),
        email varchar(255), 
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id))`,
    );
    connection.query(
      `CREATE TABLE movies (
          id INT AUTO_INCREMENT,
          title varchar(255),
          titleEng varchar(255),
          directorName varchar(255), 
          actorName varchar(255), 
          releaseDate datetime, 
          posterImg varchar(255), 
          plot varchar(255), 
          runtime varchar(255), 
          rating varchar(255), 
          created_at datetime DEFAULT CURRENT_TIMESTAMP,
          updated_at datetime DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id));`,
    );

    connection.query(
      `CREATE TABLE reviews (
        id INT AUTO_INCREMENT,
        comment varchar(255),
        movieScore INT,
        userId varchar(255),
        movieId INT
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id));`,
    );

    connection.query(
      `CREATE TABLE genres (
        genreName varchar(255),
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id));`,
    );

    connection.query(
      `CREATE TABLE genresUsers (
        id INT AUTO_INCREMENT,
        movieId INT,   
        userId varchar(255),   
        genreName varchar(255),
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id));`,
    );
    connection.query(
      `ALTER TABLE reviews ADD FOREIGN KEY (userId) REFERENCES users (id);
      ALTER TABLE reviews ADD FOREIGN KEY (movieId) REFERENCES movies (id);`,
    );

    connection.query(
      `ALTER TABLE genresUsers ADD FOREIGN KEY (userId) REFERENCES users (id);
      ALTER TABLE genresUsers ADD FOREIGN KEY (movieId) REFERENCES movies (id);`,
    );

    connection.query(`
    INSERT INTO (id,pw,userImg,email,salt) VAULES("codegeeks","1111","default image","codegeeks@gmail.com", "1000"),("corner","2222","default image","corner@gmail.com", "1000")`);
  });
});
