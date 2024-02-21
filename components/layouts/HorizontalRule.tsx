import React from "react";

function HorizontalRule() {
  return (
    <div className="flex text-primary gap-1 items-center">
      <div className="w-full h-[2px] bg-secondary-text"></div>
      <p>o</p>
      <div className="w-full h-[2px] bg-secondary-text"></div>
    </div>
  );
}

export default HorizontalRule;
