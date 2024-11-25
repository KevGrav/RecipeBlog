import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import {UserContext} from "../UserContext";
import axios from "axios";
import {Link} from 'react-router-dom';
import "./postPage.css";
import handleAddComment from "./AddComment";
//import ViewComments from "./ViewComments";


export default function PostPage({item, }) {
  const [postInfo, setPostInfo] = useState(null);
  const [viewComment, setViewComment] = useState(false);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  const [count, setCount] = useState(0)
  

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  if (!postInfo) return '';

  const handleAddLike = () => {
    setCount(count + 1)
    console.log("new vote")
  }

  const handleDeletePost = (e) => {
    console.log("del, e.tar.id", e.target)

    axios({
      method: 'delete',
      url: `http://localhost:4000/api/post/delete/${e.target.id}`,
      withCredentials: true
    })
      .then((deleted) => {
        console.log("del", deleted)
      })
    handleDeletePost(e.target.id)
  }

  

  const handleViewComments = () => {
    // conditionally render the comments out and put a counter with how many comments
    setViewComment(!viewComment)

  }
 
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      {console.warn("test" , postInfo._id)}
      <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy')}</time>
      <div className="author">by @{postInfo.author.username }</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
          <button className="delete-btn" onClick={(e) => handleDeletePost(e)} >Delete this post</button>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />

      <div id="blogCardFoot" className='border'>
        <button onClick={() => handleAddLike()}> {count} likes</button>
        <button onClick={() => handleViewComments()}> view comments</button>
        <button onClick={() => handleAddComment()}> add comment</button>
      </div>  
      
    </div>
  );
}