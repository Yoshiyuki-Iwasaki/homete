import React from 'react'

const PostInput = () => {
  return (
    <div>
      <div>
        <form action="">
          <input
            type="text"
            className="w-80 h-40 border-4 border-light-blue-500"
            // value={userInput}
            // onChange={handleChange}
            placeholder="みんなに褒めてもらいましょう(^^)"
          />
          <button className="ml-10 px-10 py-6 bg-red-200 hover:opacity-70 transition-opacity cursor-pointer">
            投稿する
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostInput
