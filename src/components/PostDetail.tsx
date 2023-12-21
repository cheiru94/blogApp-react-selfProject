import React from "react";

export const PostDetail = () => {
  return (
    <div className="post__detail">
      <div className="post__box ">
        <div className="post__title">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        {/* profile */}
        <div className="post__profile-box">
          <div className="post__profile" />
          <div className="post__author-name">패스트캠퍼스</div>
          <div className="post__date">2023.12.21 목요일</div>
        </div>
        <div className="post__utils-box">
          <div className="post__delete">삭제 </div>
          <div className="post__edit">수정</div>
        </div>
        <div className="post__text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          minima quas labore sit error nostrum doloremque? Facilis cum sed
          suscipit illum inventore fugiat repellendus cupiditate rerum quaerat
          cumque? Obcaecati, ducimus!
        </div>
      </div>
    </div>
  );
};
