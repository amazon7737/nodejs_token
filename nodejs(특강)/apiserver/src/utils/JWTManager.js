/**
 *  <주석 하는 법> 최소한 설명정도는 적어주는게 좋다
 * *  JWT Manager ( Controller)
 *  --
 * 설명: 토큰 관리 객체
 * 날짜: 2023-02-16
 * 최초작성자 : 김강민
 */

/** * ** 로직이 많다면 설명을 많이 달아주고 아니면 간단하게 달아줘도 됨
 *
 *
 * */
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

class JWTManager {
  /**
   * 생성자
   * --
   *  생성자에 id 값을 받아온다 하면 param 사용
   * @param {Number} id
   * @returns  {Object} instance
   *
   */
  // 간단한 디자인 패턴 구현
  // 디자인패턴 : 반복되는 구조에 대해서 로직을 만드는것
  // 싱긅톤 패턴 : 색깔이 하나다 . 내가 만든 어떤 객체가 싱글톤패턴으로 만들어진다면 이 서비스에서는 무조건 하나다.
  constructor() {
    if (!JWTManager.instance) {
      this.secret = "dsu@project!#2023";
      JWTManager.instance = this;
    }
    return JWTManager.instance;
  }
  /**
   * 토큰 생성 메소드
   * --
   * @param {Object} data
   * @param {String} expire // 만료 되는 시간
   *
   */
  createToken(data, e = "4h") {
    return jwt.sign(data, this.secret, { expiresIn: e }); // 두번째는 패스워드 , 세번째는 객체 타입이 들어갈꺼임
  }
}

/**
 * 토큰 인증
 * --
 *
 *
 */
const verify = async (token = null) => {
  try {
    const decoded = await jwt.verify(token, this.secret);
    if (decoded) {
      return { status: true, data: decoded };
    }
    return null;
  } catch (e) {
    return false;
  }
};

//const jwt = new JWTManager();

// 알림 -> 이슈 생겻엇음 싱글톤패턴하면 다른사람것도 나한테오고

// 로그 만들기, db 날리기 같은건 싱글톤을 사용하면 유용했음

module.exports = JWTManager;

// 해킹을 막을 수 있는 방법 : secure coding : 2만번 접속을 시도했을때 1초 - 3초 정도 딜레이를 주도록 하는 것 -> 이러면 수많은 양의 경우의 수가 생겨서 막을수 잇음.
// ** SQL 인젝션
