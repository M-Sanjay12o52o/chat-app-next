"use client"

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ChatApp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);
  const socket = io('http://localhost:3001');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit('chat message', message)
    }
  }

  return (
    <div>
      <main className="h-screen p-4 flex flex-col">
        <form className="form-join w-full max-w-screen-sm mx-auto flex gap-2">
          <input
            type="text"
            id="name"
            maxLength={12}
            placeholder="Your name"
            size={5}
            className="flex-grow max-w-[calc(80%-0.25rem)] rounded p-2 text-black"
            required
          />
          <input
            type="text"
            id="room"
            placeholder="Chat room"
            size={5}
            className="flex-grow rounded p-2 text-black"
            required
          />
          <button id="join" type="submit" className="w-1/5 bg-blue-500 rounded p-2 text-white">
            Join
          </button>
        </form>

        <ul className="chat-display bg-gray-800 list-none w-full max-w-screen-sm mx-auto rounded my-4 p-0 flex flex-col justify-start overflow-auto flex-grow">
          {/* Your chat display content goes here */}
        </ul>

        <p className="user-list w-full min-h-[2.65rem] mx-auto max-w-screen-sm p-2"></p>
        {/* ... other elements ... */}

        <form className="form-msg w-full max-w-screen-sm mx-auto" onSubmit={sendMessage}>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="w-4/5 rounded p-2 mr-2 text-black"
            required
          />
          <button type="submit" className="w-1/5 bg-blue-500 rounded p-2 text-white">
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChatApp;
