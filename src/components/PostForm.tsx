import AuthContext from "context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });

      toast?.success("게시글이 등록되었습니다.");
      navigate("/");
    } catch (e: any) {
      toast?.error(e?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">内容</label>
        <textarea
          name="content"
          id="content"
          value={content}
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <input type="submit" value="提出" className="form__btn--submit" />
      </div>
    </form>
  );
}
