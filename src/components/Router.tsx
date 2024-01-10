import { Routes, Route, Navigate } from "react-router-dom";
/* pages 폴더에서 각각의 페이지 내용들을 불러와서 Router 경로에 넣어준다. 
  pages 안에서 사용되는 페이지에는 또 반복되는 부분이 있으면 componensts폴더에서 컴포넌트를 생성해서 사용한다. 
*/
import Home from "pages/home";
import PostList from "pages/posts";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import SignupPage from "pages/signin";
import PostPage from "pages/posts/detail";

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            {/* HOME */}
            <Route path="/" element={<Home />} />
            {/* POST */}
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/new" element={<PostNew />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            {/* PROFILE */}
            <Route path="/profile" element={<ProfilePage />} />
            {/* LOGIN , SIGNUP  - 로그인 되었으면 항상 home으로 보여준다.*/}
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/signup" element={<SignupPage />} /> */}
            {/* 위에서 정의 되어있지 않은 경로로 접근 시  */}
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            {/* LOGIN , SIGNUP */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* 위에서 정의 되어있지 않은 경로로 접근 시  */}
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
