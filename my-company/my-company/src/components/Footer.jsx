function Footer() {
  const footerStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '2rem',
    marginTop: 'auto'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  };

  const linkStyle = {
    color: '#bdc3c7',
    textDecoration: 'none',
    display: 'block',
    margin: '0.5rem 0',
    transition: 'color 0.3s'
  };

  const bottomStyle = {
    borderTop: '1px solid #34495e',
    marginTop: '2rem',
    paddingTop: '1rem',
    textAlign: 'center',
    color: '#bdc3c7'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>TechCorp</h3>
          <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
            Delivering innovative technology solutions since 1990. 
            Your trusted partner for business growth and digital transformation.
          </p>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
          <a href="/" style={linkStyle}>Home</a>
          <a href="/about" style={linkStyle}>About Us</a>
          <a href="/services" style={linkStyle}>Services</a>
          <a href="/contact" style={linkStyle}>Contact</a>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Services</h4>
          <a href="/services" style={linkStyle}>Technology Consulting</a>
          <a href="/services" style={linkStyle}>Market Analysis</a>
          <a href="/services" style={linkStyle}>Product Development</a>
          <a href="/services" style={linkStyle}>Digital Marketing</a>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Connect With Us</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Facebook')}>📘</span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Twitter')}>🐦</span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('LinkedIn')}>💼</span>
            <span style={{ cursor: 'pointer' }} onClick={() => alert('Instagram')}>📷</span>
          </div>
        </div>
      </div>
      
      <div style={bottomStyle}>
        <p>&copy; 2024 TechCorp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;