import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaLeaf } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

const welcomeMessages = [
    "Hi there! Welcome to Cabbage. How can we help you today?",
    "Hello! Looking for fresh organic vegetables?",
    "Heyy!  Need help finding the best organic products?",
    "Welcome to Cabbage! How can we assist you with your fresh food journey today?",
    "Hi! Have any questions about our farm-fresh products?"
];

const FloatingChat = () => {
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    
    const [messages, setMessages] = useState([
        { 
        // eslint-disable-next-line react-hooks/purity
        text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)], 
        sender: "admin", 
        time: "Just now" 
        }
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // CRISP API INTEGRATION & FAQ EVENT LISTENER
    useEffect(() => {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "cd24f333-e004-47f2-8049-bfa54ee02495"; 

        (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
        })();

        window.$crisp.push(["do", "chat:hide"]);

        window.$crisp.push(["on", "message:received", (message) => {
        if (message.type === "text") {
            const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages((prev) => [...prev, { text: message.content, sender: "admin", time: timeString }]);
            setIsChatBoxOpen(true);
        }
        }]);

        const handleOpenChatEvent = () => {
            setIsChatBoxOpen(true);
        };

        window.addEventListener("openLiveChat", handleOpenChatEvent);
        
        return () => {
            window.removeEventListener("openLiveChat", handleOpenChatEvent);
        };
    }, []);

    // MESSAGE SEND
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [...prev, { text: inputMessage, sender: "user", time: timeString }]);
        
        window.$crisp.push(["do", "message:send", ["text", inputMessage]]);
        setInputMessage("");
    };

    return (
        <>
        <style>{`
            #crisp-chatbox, .crisp-client {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            }
            .chat-scroll::-webkit-scrollbar {
            width: 0px;
            background: transparent;
            }
        `}</style>

        <div className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-9999 flex flex-col items-end">
            {/* CHAT BOX */}
            <div 
            className={`absolute bottom-17.5 right-0 w-[92vw] sm:w-95 bg-white rounded-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${
                isChatBoxOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4 pointer-events-none"
            }`}
            >
            {/* HEADER */}
            <div className="px-5 sm:px-6 py-5 sm:py-6 bg-white relative z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3.5 sm:gap-4 items-center">
                        <div className="relative">
                            <div className="w-10 sm:w-11 h-10 sm:h-11 bg-linear-to-tr from-[#80B500] to-[#99d600] rounded-[14px] flex justify-center items-center text-white shadow-md transform rotate-3">
                                <FaLeaf className="text-lg sm:text-xl -rotate-3" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-extrabold font-int text-[#1e293b] text-[17px] sm:text-[19px] leading-tight tracking-tight">Cabbage Support</h3>
                            <p className="text-[12px] sm:text-[13px] font-nuni text-[#64748b] mt-0.5">We reply instantly</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsChatBoxOpen(false)} 
                        className="w-8 h-8 flex justify-center items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                        <FaTimes size={14} />
                    </button>
                </div>
            </div>
            {/* CHAT AREA */}
            <div className="h-80 sm:h-87.5 px-5 sm:px-6 py-5 sm:py-6 overflow-y-auto bg-[#f8fafc] flex flex-col gap-4 font-nuni chat-scroll">
                <div className="flex justify-center mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100/80 px-3 py-1 rounded-full">
                        Today
                    </span>
                </div>
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                    >
                        <div 
                        className={`px-4 py-3 text-[14px] sm:text-[14.5px] leading-relaxed shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                            msg.sender === 'user' 
                            ? 'bg-[#80B500] text-white rounded-2xl rounded-br-sm' 
                            : 'bg-white border border-gray-100 text-[#334155] rounded-2xl rounded-bl-sm'
                        }`}
                        >
                        {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1.5 px-1 font-medium">
                        {msg.time}
                        </span>
                    </div>
                    ))}
                <div ref={messagesEndRef} />
            </div>
            {/* INPUT AREA */}
            <div className="p-3.5 sm:p-4 bg-white relative z-10">
                <form onSubmit={handleSendMessage} className="flex items-center bg-[#f1f5f9] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#80B500] focus-within:shadow-[0_0_15px_rgba(128,181,0,0.1)] rounded-full p-1.5 transition-all duration-300">
                    <input 
                        type="text" 
                        value={inputMessage} 
                        onChange={(e) => setInputMessage(e.target.value)} 
                        placeholder="Message Support..." 
                        className="flex-1 bg-transparent text-[#1e293b] text-[13.5px] sm:text-[14px] font-nuni px-3.5 sm:px-4 outline-none placeholder:text-gray-400" 
                    />
                    <button 
                        type="submit" 
                        className="w-9 h-9 flex items-center justify-center bg-[#80B500] text-white rounded-full hover:bg-[#6c9a00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm cursor-pointer"
                        disabled={!inputMessage.trim()}
                    >
                        <FaPaperPlane className="text-[12px] -ml-0.5" />
                    </button>
                </form>
            </div>
            </div>
            {/* SINGLE MAIN BUTTON */}
            <button
            onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
            className={`flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 text-white rounded-full transition-all duration-300 cursor-pointer relative z-10 overflow-hidden ${
                isChatBoxOpen 
                ? "bg-[#1e293b] shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-[#334155]" 
                : "bg-[#80B500] shadow-[0_12px_30px_rgba(128,181,0,0.4)] hover:shadow-[0_15px_35px_rgba(128,181,0,0.5)]"
            }`}
            >
                <div className={`transition-all duration-300 absolute flex justify-center items-center ${isChatBoxOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                    <FiMessageSquare className="text-[22px] sm:text-[24px]" />
                </div>
                <div className={`transition-all duration-300 absolute flex justify-center items-center ${isChatBoxOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                    <FaTimes className="text-[20px] sm:text-[22px]" />
                </div>
            </button>
        </div>
        </>
    );
};

export default FloatingChat;