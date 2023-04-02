const authorize = async (req, res, next) => {
  try {
    if (req.user.roles !=="admin") {
       
      return res.status(403).send({
        success: false,
        data: `Acess denied, can only view`,
      });
    }
    next();

  } catch (error) {
    return res.status(500).send({ success: false, error: "Failed" });
  }

  // if (!req.user.isAdmin) {
  //   return res.status(403).send({
  //     success: false,
  //     message: "Access denied"
  //   })
  // }
  // next();
};

module.exports = authorize;
