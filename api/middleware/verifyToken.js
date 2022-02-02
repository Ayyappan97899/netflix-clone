const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const Token = authHeader.split(" ")[1];
    jwt.verify(Token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not Valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = verify;
