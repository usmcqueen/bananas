import React, { useState, useEffect } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
// import DOMPurify from "dompurify";

const Single = () => {
  
  const [post, setPost] = useState({});

  const location = useLocation();
  
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  console.log('user data: ', currentUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    }, [postId]);

    const handleDelete = async () => {
      try {
        await axios.delete(`/posts/${postId}`);
          navigate("/");
      } catch (err) {
          console.log(err);
      }
    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
      <div className="single">
        <div className="content">
          <img src={`./upload/${post?.img}`} alt ="" />
        </div>
        <div className="user">
          {/* {post.img && <img src={post.img} alt="" />} */}
          {post.userImg && <img src={post.userImg} alt="" />}

          <div className="info">
            <span>{currentUser.username}</span>
            {/* <p>Posted {formatDistanceToNow(new Date(post.date), { addSuffix: true})}</p> */}
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} source={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>
        {getText(post.content)}
        </p>
        <Menu cat={post.cat} />
      </div>
    );
  };

export default Single;
