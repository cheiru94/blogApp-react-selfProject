import AuthContext from "context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface postListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
}

// 디폴트 값 hasNavigation = true
export default function PostList({ hasNavigation = true }: postListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

    // console.log(datas);

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  console.log(posts);

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의글
          </div>
        </div>
      )}

      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                {/* profile */}
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div className="post__delete">삭제 </div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post"> "작성된 게시글이 아직 없습니다."</div>
        )}
      </div>
    </>
  );
}
