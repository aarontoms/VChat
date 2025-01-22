import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Message from './Message';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import url from './url';

interface MessageData {
    id: string;
    username: string;
    text: string;
}
//when tab is closed detect and remove user from chat

function Chat() {
    const socket = io(url);

    const [username, setUsername] = useState('');
    const [joinedUsers, setJoinedUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<MessageData[]>([
        { id: "1", username: 'Alice', text: 'Hello, everyone!' },
        { id: "2", username: 'Bob', text: 'Hey Alice!' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const { roomid } = useParams();

    useEffect(() => {
        socket.on(`${roomid}_joined`, (data) => {
            setJoinedUsers(data.joined_users);
        });
    }, [roomid, socket]);

    const postPassword = async (password: string) => {
        try {
            const response = await fetch(`${url}/${roomid}/postpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error validating password:', error);
            return error;
        }
    };

    const postUsername = async (name: string) => {
        const userid = uuidv4();
        const response = await fetch(`${url}/${roomid}/postname`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: name, userid: userid }),
        });
        if (!response.ok) {
            console.error('Error', response.statusText);
        }
        else {
            const data = await response.json();
            sessionStorage.setItem(data.roomid, data.userid);
            console.log(data);
        }
    }

    useEffect(() => {
        if (roomid) {
            if (sessionStorage.getItem(roomid)) {
                const userid = sessionStorage.getItem(roomid);
                console.log(userid);
                fetch(`${url}/${roomid}/getname`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userid: userid }),
                })
                .then((response) => response.json())
                .then((data) => setUsername(data.username))
                .catch((error) => console.error('Error:', error));
            }
            else {
                Swal.fire({
                    title: 'Enter room password',
                    input: 'password',
                    inputPlaceholder: 'Password',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Password is required!';
                        }
                    },
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    background: '#1e293b',
                    color: '#ffffff',
                }).then(async (passwordResult) => {
                    if (passwordResult.isConfirmed) {
                        const password = passwordResult.value.trim();
                        const res = await postPassword(password);
                        if (res.status == 200) {
                            Swal.fire({
                                title: 'Enter your username',
                                input: 'text',
                                inputPlaceholder: 'Username',
                                inputValidator: (value) => {
                                    if (!value) {
                                        return 'Username is required!';
                                    }
                                },
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                background: '#1e293b',
                                color: '#ffffff',
                            }).then(async (usernameResult) => {
                                if (usernameResult.isConfirmed) {
                                    const username = usernameResult.value.trim().toLowerCase();
                                    setUsername(username);
                                    postUsername(usernameResult.value.trim().toLowerCase());
                                }
                            });
                        }
                        else if (res.status == 401) {
                            Swal.fire({
                                title: 'Wrong password!',
                                icon: 'error',
                                background: '#1e293b',
                                color: '#ffffff',
                            }).then(() => {
                                window.location.reload();
                            });
                        }
                        else if (res.status == 404) {
                            Swal.fire({
                                title: 'Room Not Found - Room may have expired!',
                                icon: 'error',
                                background: '#1e293b',
                                color: '#ffffff',
                            }).then(() => {
                                window.location.href = '/';
                            });
                        }
                    }
                });
            }
        }
    }, [roomid]);
    useEffect(() => {
        console.log(joinedUsers);
    }, ["Users: ", joinedUsers]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        const newMsg = {
            id: uuidv4(),
            session_roomid: sessionStorage.getItem('roomid'),
            username,
            text: newMessage,
        };
        setNewMessage('');
        setMessages((prevMessages) => [...prevMessages, newMsg]);

        try {
            const response = await fetch(`${url}/${roomid}/send`, {
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
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error('Error sending message: ', error);
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.id !== newMsg.id)
            )
        }
    };

    return (
        <div className="min-h-lvh min-w-full flex flex-row justify-center bg-gray-900 text-white">
            {!username ? (
                <h1 className="text-4xl p-20">Loading...</h1>
            ) : (
                <div className='h-screen w-full flex justify-around gap-px'>
                    <div className='w-1/3 bg-gray-600 my-10 p-4 overflow-auto scrollbar-none'>
                        Joined users in chat
                        <ul>
                            {joinedUsers.map((user, index) => (
                                <li key={index} className="text-white py-1">
                                    {JSON.parse(user).username}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='w-2/3 bg-gray-600 my-10 flex flex-col'>
                        bye
                        <div className="flex-1 p-4 space-y-2 overflow-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-200">
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