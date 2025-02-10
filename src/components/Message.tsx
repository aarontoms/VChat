
const Message = ({ username, text, isOwnMessage }: { username: string; text: string; isOwnMessage: boolean }) => {
  return (
      <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
          <div
              className={`p-2 pr-8 pl-4 w-fit max-w-[75%] rounded-lg shadow-md ${
                  isOwnMessage ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200"
              }`}
          >
              <span
                  className={`block text-sm font-semibold ${
                      isOwnMessage ? "text-white" : "text-green-400"
                  }`}
              >
                  {username}
              </span>
              <p className="mt-0.5 text-sm">{text}</p>
          </div>
      </div>
  );
};

export default Message;
