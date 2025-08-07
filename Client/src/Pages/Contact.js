import React, { useState } from 'react';
import './Contact.css';

const reviews = [
  {
    name: 'Alice Johnson',
    date: '2025-06-01',
    message: 'Amazing portfolio! Very professional and clean.',
    stars: 5,
  },
  {
    name: 'Mark T.',
    date: '2025-05-28',
    message: 'Impressive work, especially the UI designs.',
    stars: 4,
  },
  {
    name: 'Layla Ahmad',
    date: '2025-05-20',
    message: 'Great content and nice layout!',
    stars: 4,
  },
  {
    name: 'Carlos R.',
    date: '2025-04-30',
    message: 'Super responsive and stylish. Loved it.',
    stars: 5,
  },
];

const renderStars = (count) => {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
};

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us & Reviews 📬⭐</h1>
      
      <div className="contact-content">
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send Message</button>
            {status && <p className="status-message">{status}</p>}
          </form>
        </div>
        
        <div className="reviews-section">
          <h2>What People Say About Us</h2>
          <div className="reviews-container">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <h4>{review.name}</h4>
                  <span>{review.date}</span>
                </div>
                <p className="review-message">{review.message}</p>
                <div className="review-stars">{renderStars(review.stars)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;