import React from "react";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <>
      <div className="profile__box">
        <div className="flex__box-lg">
          <div className="profile__image" />
          <div>
            <div className="profile__email">cheiru94@gmail.com</div>
            <div className="profile__name">이재일</div>
          </div>
        </div>
        <Link to="/" className="profile__logout">
          LogOut
        </Link>
      </div>
    </>
  );
};
