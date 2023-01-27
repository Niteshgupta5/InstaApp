import React, { useState } from "react";
  
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text" style={{color: "black",cursor: "pointer", fontSize: "14px"}}>
      {isReadMore ? text.slice(0, 140) : text}
      <span onClick={toggleReadMore} className="read-or-hide" style={{display: "inline", width: "100%"}}>
        {isReadMore ? <span style={{color: "rgb(253, 29, 29)"}}> more...</span> : <span style={{color: "rgb(253, 29, 29)"}}> Show less...</span>}
      </span>
    </p>
  );
};
  
export default ReadMore;