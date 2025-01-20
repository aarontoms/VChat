import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Message from './Message';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface MessageData {
    id: string;
    username: string;
    text: string;
}

const url = 'https://live-catie-vteam-9afb6540.koyeb.app'
// const url = 'http://127.0.0.1:5000'

function Chat() {
    const [username, setUsername] = useState('niggesh');
    const [messages, setMessages] = useState<MessageData[]>([
        { id: "1", username: 'Alice', text: 'Hello, everyone!' },
        { id: "2", username: 'Bob', text: 'Hey Alice!' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const { id } = useParams();

    const postUsername = async () => {
        const response = await fetch(`${url}/${id}/postname`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.trim().toLowerCase() }),
        });
        if (!response.ok) {
            console.error('Error', response.statusText);
        }
        else {
            console.log('Username sent');
            const data = await response.json();
            console.log(data);
        }
    }

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        const newMsg = {
            id: uuidv4(),
            session_groupid: sessionStorage.getItem('groupid'),
            username,
            text: newMessage,
        };
        setNewMessage('');
        setMessages((prevMessages) => [...prevMessages, newMsg]);

        try {
            const response = await fetch(`${url}/${id}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMsg),
            })
            if (!response.ok) {
                console.error('Error', response.statusText);
                setMessages((prevMessages) =>
                    prevMessages.filter((msg) => msg.id !== newMsg.id)
                )
            }
            else {
                console.log('Message sent');
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error('Error sending message: ', error);
            setMessages((prevMessages)=>
                prevMessages.filter((msg) => msg.id !== newMsg.id)
            )
        }
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
    // postUsername();
    //         }
    //     });
    // }, []);

    return (
        <div className="min-h-lvh min-w-full flex flex-row justify-center bg-gray-900 text-white">
            {!username ? (
                <h1 className="text-xl">Loading...</h1>
            ) : (
                <div className='h-screen w-full flex justify-around gap-px'>
                    <div className='w-1/3 bg-gray-600 my-10 p-4'>
                        Joined users in chat
                    </div>
                    <div className='w-2/3 bg-gray-600 my-10 flex flex-col'>
                        bye
                        <div className="flex-1 p-4 space-y-2 overflow-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                            {messages.map((msg) => (
                                <Message
                                    // key={msg.id}
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                            handleSendMessage();
                                    }}
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