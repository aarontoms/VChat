import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Message from './Message';

interface MessageData {
    id: number;
    username: string;
    text: string;
}

function Chat() {
    const [username, setUsername] = useState('name');
    const [messages, setMessages] = useState<MessageData[]>([
        { id: 1, username: 'Alice', text: 'Hello, everyone!' },
        { id: 2, username: 'Bob', text: 'Hey Alice!' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            username,
            text: newMessage,
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    // useEffect(() => {
    //     Swal.fire({
    //         title: 'Enter your username',
    //         input: 'text',
    //         inputPlaceholder: 'Username',
    //         inputValidator: (value) => {
    //             if (!value) {
    //                 return 'Username is required!';
    //             }
    //         },
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //         background: '#1e293b',
    //         color: '#ffffff',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             setUsername(result.value);
    //         }
    //     });
    // }, []);

    return (
        <div className="min-h-lvh min-w-full flex flex-row justify-center bg-gray-900 text-white">
            {!username ? (
                <h1 className="text-xl">Loading...</h1>
            ) : (
                // <div>
                //     <div>
                //         Sidebar
                //     </div>

                //     <div>
                //         <div className="flex-1 overflow-y-auto p-4 space-y-2">
                //             {messages.map((msg) => (
                //                 <Message
                //                     key={msg.id}
                //                     username={msg.username}
                //                     text={msg.text}
                //                     isOwnMessage={msg.username === username}
                //                 />
                //             ))}
                //         </div>
                //         <div className="p-4 bg-gray-800">
                //             <div className="flex items-center space-x-4">
                //                 <input
                //                     type="text"
                //                     value={newMessage}
                //                     onChange={(e) => setNewMessage(e.target.value)}
                //                     placeholder="Type a message..."
                //                     className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                //                 />
                //                 <button
                //                     onClick={handleSendMessage}
                //                     className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                //                 >
                //                     Send
                //                 </button>
                //             </div>
                //         </div>
                //     </div>
                // </div>
                <div className='h-screen w-full flex justify-around'>
                    <div className='w-1/3 bg-gray-600 my-10 p-4'>
                        Joined users in chat
                    </div>
                    <div className='w-2/3 bg-gray-400 m-10 p-4'>
                        bye
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {messages.map((msg) => (
                                <Message
                                    key={msg.id}
                                    username={msg.username}
                                    text={msg.text}
                                    isOwnMessage={msg.username === username}
                                />
                            ))}
                        </div>
                        <div className="p-4 bg-gray-800">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat