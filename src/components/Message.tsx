import React from 'react';

interface MessageProps {
  username: string;
  text: string;
  isOwnMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ username, text, isOwnMessage }) => {
  return (
    <div
      className={`p-3 my-2 max-w-sm rounded-lg ${
        isOwnMessage ? 'bg-blue-500 text-gray-300 ml-auto' : 'bg-gray-400 text-black mr-auto'
      }`}
    >
      {!isOwnMessage && <p className="font-bold text-sm">{username}</p>}
      <p>{text}</p>
    </div>
  );
};

export default Message;
