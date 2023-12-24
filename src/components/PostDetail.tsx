import { Link, useParams ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { doc, getDoc , deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";
import { toast } from "react-toastify";

export const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const getpost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnp = await getDoc(docRef);
      setPost({ id: docSnp.id, ...(docSnp?.data() as PostProps) });
    }
  };
 
  const handleDelete = async () => {
    const confirm = window.confirm('해당 게시물을 정말 삭제하시겠습니까?');
    if (confirm && post && post.id) {
      console.log('delete');
      await deleteDoc(doc(db, 'posts', post.id))
      toast.success('게시글이 삭제되었습니다!')
      navigate('/');

    }
  }

  useEffect(() => { 
    if (params?.id) getpost(params?.id);
  }, [params?.id]);

  return (
    <div className="post__detail">
      {post ? (<div className="post__box ">
        <div className="post__title">
        {post.title}
        </div>
        {/* profile */}
        <div className="post__profile-box">
          <div className="post__profile" />
          <div className="post__author-name">{post.email}</div>
          <div className="post__date">{post.createdAt}</div>
        </div>
        <div className="post__utils-box">
          <div className="post__delete" role="presentation" onClick={handleDelete}>삭제 </div>
          <div className="post__edit">
            <Link to={`/posts/edit/${post?.id}`}>수정</Link>
          </div>
        </div>
        <div className="post__text post_text--pre-wrap">
          {post?.content}
        </div>
      </div>) : <Loader />}
      
    </div>
  );
};
