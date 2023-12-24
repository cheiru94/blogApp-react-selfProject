import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext } from "react";
import { toast } from "react-toastify";

/* form 태그 제출 버튼시 실행 */
const onSubmit = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");
  } catch (error: any) {
    console.log(error);
    toast.error(error?.code);
  }
};

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log("user: ", user);

  return (
    <>
      <div className="profile__box">
        <div className="flex__box-lg">
          <div className="profile__image" />
          <div>
            <div className="profile__email">{user?.email}</div>
            <div className="profile__name">{user?.displayName || "사용자"}</div>
          </div>
        </div>
        <div
          role="presenrtation"
          className="profile__logout"
          onClick={onSubmit}
        >
          LogOut
        </div>
      </div>
    </>
  );
}
