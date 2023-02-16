import React, { useState } from 'react';
import './ChatBot.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: 'Hi, I am Microsoft Assistant. How can I help you?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(`Form submitted with value: ${inputValue}`);
    setMessages([...messages, { text: inputValue, isBot: false }]);
    setInputValue('');
  
    try {
      const response = await fetch('your-api-url', { // TODO: put the api for the model
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });
      const data = await response.json();
      setMessages([...messages, { text: data.message, isBot: true }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatBot}>
        <img 
            src={process.env.PUBLIC_URL + '/chatbot-icon.png'} 
            alt="Chat Bot Icon" 
            style={{ width: '50px', height: '50px' }}
            className="chatbot-icon"
            onClick={toggleChatBot}
        />
      </div>
      {/* drop down animation */}
    <ReactCSSTransitionGroup
      transitionName="chatbot-window"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
    {isOpen &&
      <div className={`chatbot-window`}>
        <div className="chatbot-header">
          <h3>Microsoft Assistant ChatGPT</h3>
        </div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index}>
              {message.isBot ? (
                <div className="bot-message">{message.text}</div>
              ) : (
                <div className="user-message">{message.text}</div>
              )}
            </div>
          ))}
        </div>
        <div className="chatbot-input-container">
            <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button type="submit">Send</button>
            </form>
        </div>
      </div>
    }
      </ReactCSSTransitionGroup>
    </div>
  );
}

export default ChatBot;
