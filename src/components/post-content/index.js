import React from "react";
import "./index.scss";
import Utterances from "../Utterances";

const PostContent = ({ content }) => {
  return (
    <>
      <div
        className="body-1 postContent"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Utterances />
    </>
  );
};
export default PostContent;
