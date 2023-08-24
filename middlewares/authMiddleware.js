import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    next();
  } catch (err) {
    console.log(err);
    res.send({ ok: false, message: "Login Again" });
  }
};
