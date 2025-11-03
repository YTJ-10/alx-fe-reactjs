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
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    alignItems: 'start'
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
    fontSize: '1rem',
    transition: 'border-color 0.3s'
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
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.3s'
  };

  const infoStyle = {
    padding: '2rem'
  };

  const contactItemStyle = {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
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
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
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
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
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
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
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

      <div style={infoStyle}>
        <h2 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Get in Touch</h2>
        
        <div style={contactItemStyle}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>📍 Address</h3>
          <p>123 Business District<br />Tech City, TC 10001</p>
        </div>

        <div style={contactItemStyle}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>📞 Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>

        <div style={contactItemStyle}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>✉️ Email</h3>
          <p>info@techcorp.com</p>
        </div>

        <div style={contactItemStyle}>
          <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>🕒 Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 2:00 PM</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;