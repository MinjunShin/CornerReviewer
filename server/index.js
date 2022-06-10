const cookieParser = require("cookie-parser");
const express = require("express");
const corse = require("cors");
const indexRouter = require("./routes");

const app = express();

const port = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  corse({
    origin: true,
    credentials: true,
    methods: ["GET", "POSt", "OPTIONS", "PATCH"],
  }),
);
app.use(cookieParser());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

module.exports = app;
