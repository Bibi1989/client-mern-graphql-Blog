import React from "react";

const LikeButton = ({ post: { likeCount } }) => {
    useEffect(() => {
        if()
      }, [bool]);
  return (
    <div>
      <span onClick={() => handleLike(post.id)}>
        <i
          style={post.likeCount === 1 ? { color: "orangered" } : {}}
          className='fas fa-heart'
        ></i>{" "}
        {likeCount}
      </span>
    </div>
  );
};

export default LikeButton;
