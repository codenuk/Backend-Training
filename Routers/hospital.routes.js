const express = require("express");
const router = express.Router();
const connection = require("../db.js");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM mydb.room;", async function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM mydb.room where id= '${id}'`,
    async function (err, results) {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.post("/", (req, res) => {
  const payload = req.body;
  let _data = [
    new Date(payload.date),
    payload.chargeNurse,
    payload.goalsForToday,
    payload.precaution,
    payload.specialNeeds,
    payload.comment,
    payload.questionAskDoctor,
  ];
  connection.query(
    `INSERT INTO mydb.room(date, chargeNurse, goalsForToday, precaution, specialNeeds, comment, questionAskDoctor) VALUES(?,?,?,?,?,?,?)`,
    _data,
    async function (err, results) {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  payload.date = new Date(payload.date);
  connection.query(
    `UPDATE mydb.room SET ? WHERE ?`,
    [payload, id],
    async function (err, results) {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE FROM mydb.room WHERE id = '${id}'`,
    async function (err, results) {
      if (err) throw err;
      res.json(results);
    }
  );
});

module.exports = router;
