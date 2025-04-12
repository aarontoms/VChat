# VazhaChat 🍃

**VazhaChat** is a minimal, real-time group chat web app built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.  
Users can join chat rooms using a shared password and chat instantly with others.

## 🚀 Features
- Create or join a chat room by entering a room ID.
- Real-time group messaging.
- Temporary messages (auto-delete logic can be added).
- Clean and modern UI with TailwindCSS.
- Auto-scroll to latest message.
- Visual distinction between own messages and others'.

## 🖥️ Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **Deployment**: Vercel

# 📚 Usage Guide

## 🏠 Home Page
- Create a room and set a password(Note: Other users will need this password to enter your room).
  OR
- Enter the **Room ID** (visible in the owners URL e.g., `https://vazhachat.vercel.app/room/<roomid>`). Click the **Join** button to enter the chat room.

## 💬 Inside the Chat Room
- You will see all the messages exchanged in real-time.
- Type a message in the input field and press **Enter**.

## 🔗 Sharing
- Share the **room link** (e.g., `https://vazhachat.vercel.app/room/<roomid>`) with friends.
- Anyone using the same room ID can join and chat together.

## 🛠️ Development Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vazhachat.git
cd vazhachat
