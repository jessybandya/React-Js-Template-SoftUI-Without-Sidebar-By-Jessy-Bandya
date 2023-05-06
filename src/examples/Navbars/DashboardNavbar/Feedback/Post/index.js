import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import { db,auth } from '../../../../../auth/firebase';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Post({ ratedByUid, rating1, ratingComment, ratingTime, reviewId, eventId}) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const authId = useSelector((state) => state.authId);

  var d = ratingTime;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <span style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    {rating1}/5 <Rating name="half-rating-read" value={rating1} precision={0.5} readOnly /> <span style={{marginLeft:8}} onClick={()=> alert("Work in progress...")}>5 replies</span>
    </span>,
  ];

  const [currentUser, setCurrentUser] = useState('')
  React.useEffect(() => {
    db.collection('users').doc(`${ratedByUid}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])

const deleteReview = () =>{
  if(window.confirm(`Are you sure you want to delete your review?`)){
      db.collection("feedbacks").doc(reviewId).delete().then(function() {
      }).catch(function(error) {
          toast.error("Error removing post: ", error);
      }); 
      toast.success("Review has been deleted!")   
    }
}

const reportReview = () => {
  alert("In progress...")
}


  return (
    <Comment
      actions={actions}
      author={<a>{currentUser?.firstName} {currentUser?.lastName}</a>}
      avatar={<Avatar src={currentUser?.profilePhoto} alt={`${currentUser?.firstName} ${currentUser?.lastName}`} />}
      content={
        <>
        {authId === ratedByUid ?(
          <p onClick={deleteReview} style={{cursor:'pointer'}}>
          {ratingComment}
        </p>
        ):(
          <p onClick={reportReview} style={{cursor:'pointer'}}>
          {ratingComment}
        </p>
        )}
        </>
      }
      datetime={
        <Tooltip title={`${date}`}>
          <span>{`${moment(ratingTime).fromNow()}`}</span>
        </Tooltip>
      }
    />
  )
}

export default Post