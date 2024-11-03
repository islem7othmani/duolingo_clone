import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Add the user message to the chat
    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/translation/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const result = await response.json();
      const botMessage = { role: 'assistant', content: result.choices[0].message.content };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen p-4 ">
      <h2 className="text-xl font-semibold text-center mb-4">Chatbot</h2>
      <div className="flex-1 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-2  bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100"> {/* Removed max-w-lg and h-80 */}
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-3 py-2 rounded-lg w-aitp ${message.role === 'user' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-black'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-500">... typing</div>}
        <div ref={messagesEndRef} /> {/* Scroll target */}
      </div>
      <form onSubmit={handleSendMessage} className="flex relative bottom-12">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
