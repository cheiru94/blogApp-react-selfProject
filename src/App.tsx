import { useContext, useEffect, useState } from "react";
import Router from "./components/Router";

/* firebase */
import { app } from "firebaseApp"; //  firebaseApp에서 선언한 app
import { getAuth, onAuthStateChanged } from "firebase/auth"; // 현재 사용자가 로그인 되어있는지 유무를 판별한다.

/* react-toastify */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";
import ThemeContext from "context/ThemeContext";

function App() {
  const context = useContext(ThemeContext);

  const auth = getAuth(app); // app을 넣어줘야 동작을 한다.

  // auth를 체크하기 전에 (initailize 전)에는 Loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  // auth의 currentUser가 있으면 authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <div className={context.theme === "light" ? "white" : "dark"}>
        {/* 라우터 */}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </div>
    </>
  );
}

export default App;
