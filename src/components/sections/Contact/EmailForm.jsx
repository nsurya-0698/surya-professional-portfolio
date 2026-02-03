import React, { useState } from 'react'
import emailjs from '@emailjs/browser';

const EmailForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false); // State for notification
    const [error, setError] = useState(''); // error message
  
    const resetForm = () => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    };
  
    const validateEmail = (email) => {
      // Simple email regex
      return /^\S+@\S+\.\S+$/.test(email);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (name.trim() === '') {
        setError('Name is required.');
        return;
      } else if (email.trim() === '') {
        setError('Email is required.');
        return;
      } else if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      setError(''); // Clear any previous error
  
      // Your EmailJS service ID, template ID, and Public Key
      const serviceId = 'service_iv6t5r9';
      const templateId = 'template_cum0fbe';
      const publicKey = 'ebINNDIg7FPq8si3c';
  
      // Create a new object that contains dynamic template params
      const templateParams = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        to_name: 'Surya',
        message: message,
      };
  
      // Send the email using EmailJS
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully!', response);
          setShowNotification(true);
          resetForm();
          setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    };
  
    return (
      <form onSubmit={handleSubmit} className='emailForm'>
        <div className="formGroup">
          <input
            type="text"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="formInput nameInput"
            required
          />
          <input
            type="email"
            placeholder="Your Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="formInput emailInput"
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="formInput phoneInput"
          />
        </div>
        <textarea
          placeholder="Message"
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="formTextarea"
        />
        <button type="submit">Let's Talk</button>
  
        {error && <div className="error">{error}</div>}
        {showNotification && <div className="notification">Form submitted successfully!</div>}
      </form>
    );
  };
  
  export default EmailForm;