import React, { useState } from "react";
import { Link } from "react-router-dom";

interface postListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

// 디폴트 값 hasNavigation = true
export default function PostList({ hasNavigation = true }: postListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
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
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              {/* profile */}
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">패스트캠퍼스</div>
                <div className="post__date">2023.12.21 목요일</div>
              </div>
              <div className="post__title">게시글{index}</div>
              <div className="post__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt minima quas labore sit error nostrum doloremque?
                Facilis cum sed suscipit illum inventore fugiat repellendus
                cupiditate rerum quaerat cumque? Obcaecati, ducimus!
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제 </div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
