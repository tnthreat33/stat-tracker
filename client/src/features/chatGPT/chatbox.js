
import React, { useState } from 'react';

const Chatbox = () => {
  const [query, setQuery] = useState('');
  
const sendQuery = (query) => {
  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};


  const handleSendQuery = () => {
    sendQuery(query);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSendQuery}>Send</button>
      
    </div>
  );
};

export default Chatbox;
