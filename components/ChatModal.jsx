import React, { useState } from "react";
import { X, Send, Phone, Video, Paperclip, Smile } from "lucide-react";

export const ChatModal = ({ vehicle, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "owner",
      text: "Xin chào! Cảm ơn bạn đã quan tâm đến xe của tôi. Tôi có thể giúp gì cho bạn?",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          text: message,
          timestamp: new Date().toISOString(),
        },
      ]);
      setMessage("");

      // Simulate owner response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "owner",
            text: "Cảm ơn tin nhắn của bạn! Tôi sẽ phản hồi sớm nhất có thể.",
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 2000);
    }
  };

  const handleCall = () => {
    alert("Đang kết nối cuộc gọi với chủ xe...");
  };

  const handleVideoCall = () => {
    alert("Đang khởi động video call...");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md h-[90vh] sm:h-[600px] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-blue-600 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">
                {vehicle?.name?.charAt(0) || "O"}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-white">Chủ xe {vehicle?.name}</h3>
              <span className="text-xs text-blue-100">● Đang hoạt động</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCall}
              className="p-2 hover:bg-blue-700 rounded-full transition-colors text-white"
              title="Gọi điện"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={handleVideoCall}
              className="p-2 hover:bg-blue-700 rounded-full transition-colors text-white"
              title="Video call"
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-700 rounded-full transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-900"
                } rounded-2xl px-4 py-2 shadow-sm`}
              >
                <p className="text-sm">{msg.text}</p>
                <span
                  className={`text-xs mt-1 block ${
                    msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
              <Smile className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
