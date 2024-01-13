import { useContext, useState } from "react";
import { CommentsInterface, PostProps } from "./PostList";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext); /* 유저 가져오기 */

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, "posts", post.id);
        /* user가 로그인 되어있으면*/
        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments:
              arrayUnion(
                commentObj
              ) /* 문서에 배열 필드가 포함되어 있으면 arrayUnion메서드 사용해서 배열에 없는 내용만 추가하기  */,
            updateDated: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
          // 수정한 내용으로 다시 작성 내용들 다시불러오기
          await getPost(post.id);
        }
      }

      // updateDoc이 성공적으로 업데이트 되었다면 토스트로 알림 추가
      toast.success("댓글을 생성했습니다.");
      setComment("");
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };

  const handleDeleteComment = async (data: CommentsInterface) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (confirm && post.id) {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.success("댓글을 삭제했습니다.");
      // 문서 업데이트
      await getPost(post.id);
    }
  };

  return (
    <div className="comments">
      {/* 댓글 입력 form 창 */}
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>

      {/* 게시글 리스트 */}
      <div className="comments__list">
        {post?.comments
          ?.slice(0)
          ?.reverse()
          .map((comment) => (
            <div key={comment.createdAt} className="comment__box">
              <div className="comment__profile-box">
                <div className="comment__email">{comment?.email}</div>
                <div className="comment__date">{comment?.createdAt}</div>

                {/* 현재 로그인 한 유저가 자신이 작성한 글일 경우 삭제 가능 */}
                {comment.uid === user?.uid && (
                  <div
                    className="comment__delete"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    삭제
                  </div>
                )}
              </div>
              <div className="comment__text">{comment?.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
