const pingRouter = require("express").Router();

pingRouter.get("/", (req, res) => {
  res.json({ message: "pong", time: new Date().toISOString() });
});

module.exports = pingRouter;
