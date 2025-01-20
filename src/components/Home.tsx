import React, { useState } from "react";

function Home() {
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [createPassword, setCreatePassword] = useState('');

    const handleJoinRoom = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Joining room:', { joinCode });
        window.location.href = `/room/${joinCode}`;
    };

    const handleCreateRoom = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating room with password:', createPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 px-8">
            <div className="w-full max-w-md flex items-center justify-center">
                {!showCreateForm && (
                    <button
                        onClick={() => setShowJoinForm(true)}
                        className="w-50 px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2"
                    >
                        Join Room
                    </button>
                )}
                {showCreateForm && (
                    <div className="bg-white rounded-xl shadow-lg p-6 px-20 py-12">
                        <form onSubmit={handleCreateRoom} className="space-y-6">
                            <div>
                                <label htmlFor="createPassword" className="block text-sm font-medium text-gray-700">
                                    Room Password
                                </label>
                                <input
                                    id="createPassword"
                                    type="password"
                                    required
                                    value={createPassword}
                                    onChange={(e) => setCreatePassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Set room password"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700"
                                >
                                    Create Room
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className="w-full max-w-md flex items-center justify-center">
                {!showJoinForm && (
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="w-50 px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2"
                    >
                        Create Room
                    </button>
                )}
                {showJoinForm && (
                    <div className="bg-white rounded-xl shadow-lg px-20 py-12">
                        <form onSubmit={handleJoinRoom} className="space-y-6">
                            <div>
                                <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700">
                                    Room Code
                                </label>
                                <input
                                    id="roomCode"
                                    type="text"
                                    required
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter room code"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowJoinForm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
                                >
                                    Join Room
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home