// import UserService from "./user.service";

const UserService = require("./user.service");
const JWTManager = require("../../utils/JWTManager");
const Authenticator = require("../../middlware/Authenticator");
const Controller = [
  {
    path: "/users",
    method: "get",
    middleware: [],
    controller: (request, response, _next) => {
      const data = UserService.getUsers();
      const JM = new JWTManager();
      const tokenData = {
        id: "asd",
      };
      const tokent = JM.createToken(tokenData, "4h");
      response.status(200).json({
        status: 200,
        message: "success",
        data: tokent,
      });
    },
  },
  {
    path: "/users/verify",
    method: "get",
    middleware: [Authenticator],
    controller: (req, res, next) => {
      res.status(200).json({
        status: 200,
        message: "success",
        data: req.userInfo,
      });
    },
  },
];
// 앞으로 controller 쓸때 이 구조를 가지고 돌아갈꺼임
// 재사용이 가능하도록 한것 같음.
// 조립해서 쓰는 느낌
// 언제 바뀔지 모르니까 각각 쪼개놓고 조합해서 사용
// 모듈식 개발
// export default Controller;
module.exports = Controller;
