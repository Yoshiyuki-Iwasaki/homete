import React from "react";
import Follow from './Follow';

const User = ({ todo }) => {

  return (
    <div className="mt-32">
      <figure className="w-1/5 mx-auto">
        <img
          className="rounded-full w-full border-4 border-light-blue-500 border-opacity-25"
          src={todo.photoURL}
        />
      </figure>
      <h1 className="mt-3 text-center text-2xl font-bold">{todo.displayName}</h1>
      <Follow userId={todo} />
    </div>
  );
};

export default User
