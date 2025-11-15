import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '8px 0 20px 0',
    border: '2px solid #ecf0f1',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const buttonStyle = {
    backgroundColor: isSubmitting ? '#95a5a6' : '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: isSubmitting ? 'not-allowed' : 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
              Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
              Message *
            </label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              style={textareaStyle}
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={buttonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;