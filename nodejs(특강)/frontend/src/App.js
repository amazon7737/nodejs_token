import logo from "./logo.svg";
import "./App.css";
import { Input, DatePicker, Button, Divider } from "antd";
import { useState } from "react";
/**
 *
 * [Component] App
 */

const BACKEND_URL = "http://localhost:3000";

function App() {
  /* ======== State ====== */
  const [data, setData] = useState(null);
  /* =========Variables =======*/
  /* =========Functions ========*/

  // on 말고 handle 를 사용하는 이유 : 일관성을 유지하기 위해서
  // on 과 handle 은 외부에서 사용하냐 차이 , on 은 외부에서 사용할때 handle 은 x ,
  // 장점:
  // 오류를 추적하기 쉬움 handle 에서 오류가 났으면 내부에서 낫구나 , on에서 났으면 외부에서 낫구나.
  // 협업을 할때 명명규칙을 정해서 쓰면 정말 쉽다
  const handleLogin = async () => {
    try {
      // 에러 : 서버에서 요청을 허용해줘야한다 이럴땐 cors 를 사용하면 된다.
      const result = await fetch(`${BACKEND_URL}/users`);
      const jsonData = await result.json();
      setData(jsonData);
      // console.log("jsonData:", jsonData);
      console.log("result: ", result);
    } catch (e) {
      alert("X");
    }
  };

  const handleVerify = () => {
    const url = `${BACKEND_URL}/users/verify`;
    const options = {
      headers: {
        // Authorization: `Bearer ${data.token}`,
        Authorization: `Bearer ${data}`,
      },
    };
    console.log("data:", data);
    fetch(url, options)
      .then((result) => result.json())
      .then((result) => {
        console.log("result:", result);
      })
      .catch((e) => {
        console.log("e:", e);
      });
  };

  /* ========Render ==========*/
  return (
    <div className="App">
      <header className="App-header">
        {/* {로그인 폼} */}
        <h1>Login</h1>
        <div
          style={{
            width: 400,
            padding: 25,
            backgroundColor: "#fff",
            borderRadius: 15,
          }}
        >
          <Input placeholder="Your account" />;
          <Input placeholder="Your password" />;
          <Button block type="primary" onClick={handleLogin}>
            Sign in
          </Button>
          <Button block type="link">
            Sign up
          </Button>
        </div>
        <Divider style={{ background: "#fff" }} />

        {/* {인증정보 확인} */}
        <div>
          <Button type="default" onClick={handleVerify}>
            Verity
          </Button>
          <Button type="primary" onClick={(handleVerify) => setData(null)}>
            {/* 함수를 한번더 즉시실행하는걸 방지해서 인스턴스화를 해놓았다 */}
            Clear
          </Button>
          <p>{JSON.stringify(data)}</p>
        </div>
      </header>
    </div>
  );
}
export default App;

// 20분도 안되서 로그인 페이지 완성 -> 생산력이 엄청남 antDesign
// ** 바인딩?
