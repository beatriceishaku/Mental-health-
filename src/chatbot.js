import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        setMessages([...messages, { text: input, sender: "user" }]);

        const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });
        setMessages([...messages, { text: input, sender: "user" }, { text: response.data.response, sender: "bot" }]);
        setInput("");
    };

    return (
        <div style={{ width: "50%", margin: "auto", textAlign: "center", padding: "20px" }}>
            <h2>Mental Health Chatbot</h2>
            <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                        <p><strong>{msg.sender}:</strong> {msg.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: "80%", padding: "10px", marginTop: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>Send</button>
        </div>
    );
};

export default Chatbot;
