import React, { useState, useEffect } from 'react';
import { Subject } from 'rxjs';

const subject = new Subject();

const messageService = {
  sendMessage: (message) => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
};

const LessonThree = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // subscribe to home component messages
    const subscription = messageService.getMessage().subscribe((message) => {
      if (message) {
        // add message to local state if not empty
        setMessages((prevState) => [...prevState, message]);
      } else {
        // clear messages when empty message received
        setMessages([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);


  const sendMessage = () => {
    messageService.sendMessage('This is a message from Rxjs');
  };

  const clearMessages = () => {
    messageService.clearMessages();
  };

  return (
    <div>
      <h5>Lesson3</h5>
      <span>Description:</span>
      <p>
        With managing states between components!
      </p>
      {messages && messages.map((message) => (
        <div style={
          {
            color: '#155724',
            backgroundColor: '#d4edda',
            borderColor: '#c3e6cb',
            position: 'relative',
            padding: '.75rem 1.25rem',
            marginBottom: '1rem',
            border: '1px solid transparent',
            borderRadius: '.25rem',
          }
        }
        >
          {message.text}
        </div>
      ))}
      <div style={{
        background: 'lightsalmon', padding: '20px', display: 'flex', justifyContent: 'center', borderRadius: '4px',
      }}
      >
        <button type="button" onClick={sendMessage} className="btn btn-primary">Send Message</button>
        <button type="button" onClick={clearMessages} className="btn btn-secondary">Clear Messages</button>
      </div>
    </div>
  );
};

export default LessonThree;
