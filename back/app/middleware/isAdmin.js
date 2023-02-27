/**
 * @module isAdmin
 */
module.exports = (req, res, next) => {
  const role = req.auth.clientRole;
  if (role !== 'admin') {
    return res.status(403).json({
      error: `access only by admin`,
    });
  }
  next();
};
