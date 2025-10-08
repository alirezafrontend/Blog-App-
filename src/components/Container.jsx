import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-[20px] overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
}
