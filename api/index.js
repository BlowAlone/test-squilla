import express from "express";

const router = express.Router();

const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

router.post("/login", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "admin") {
    req.session.authUser = { username: "admin" };
    return res.json({ username: "admin" });
  }
  res.status(401).json({ message: "Введены неверные данные" });
});

router.post("/logout", (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
});

export default {
  path: "/api",
  handler: router
};
