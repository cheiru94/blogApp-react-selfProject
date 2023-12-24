import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";

export const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
 
  const getpost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnp = await getDoc(docRef);

      setPost({ id: docSnp.id, ...(docSnp?.data() as PostProps) });
    }
  };
 
  const handleDelete = () => {
    console.log('delete');
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
          <div className="post__delete" role="presentation" onClick={handleDelete}>削除 </div>
          <div className="post__edit">
            <Link to={`/posts/edit/1`}>修正</Link>
          </div>
        </div>
        <div className="post__text post_text--pre-wrap">
          {post?.content}
        </div>
      </div>) : <Loader />}
      
    </div>
  );
};
