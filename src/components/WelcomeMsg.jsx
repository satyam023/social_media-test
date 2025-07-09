import React from "react";

function WelcomeMsg() {
  return (
    <div className="wlcMsg">
      <div className="alert alert-danger " role="alert">
        There is no post to display. Please add a post.
      </div>
      {/* <button className="btn btn-primary" onClick={onGetPostsClick}>
        {" "}
        Get Posts From Server
      </button> */}
    </div>
  );
}

export default WelcomeMsg;
