const authRequest = (req, res, next) => {
  if (req.headers.authorization == process.env.AUTH_KEY) {
    next();
  } else {
    res.status(404).send("Not Found");
  }
};

module.exports = authRequest;
