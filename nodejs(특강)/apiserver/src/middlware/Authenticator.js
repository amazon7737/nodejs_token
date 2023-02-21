const JWTManager = require("../utils/JWTManager");

/**
 * 인증미들웨어
 * --
 *
 *
 */

// 미들웨어  : controller 중간중간에 처리가 가능한 구조
// JWT : 신분증같은 개념 ( 자바스크립트)


const Authenticator = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(200).json({
        status: 401,
        message: "Permission denined",
      });
    }
    const token = authorization.split("Bearer")[1];
    const JM = new JWTManager();
    const result = await JM.verify(token);
    // req.userInfo = result.data;
    if (!result.status) {
      return res.status(200).json({
        status: 401,
        message: "Permission denined",
      });
    }
    req.userInfo = result.data;
    next();
  } catch (e) {
    return res.status(200).json({
      status: 500,
      message: "Server Error",
    });
  }
};

module.exports = Authenticator;
