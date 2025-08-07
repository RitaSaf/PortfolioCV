import React, { createContext, useState } from 'react';

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
