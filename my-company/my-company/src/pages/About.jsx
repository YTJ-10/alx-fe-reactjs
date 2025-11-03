function About() {
  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    lineHeight: '1.6'
  };

  const sectionStyle = {
    marginBottom: '3rem',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const headingStyle = {
    color: '#2c3e50',
    borderBottom: '3px solid #3498db',
    paddingBottom: '0.5rem',
    marginBottom: '1rem'
  };

  const teamGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };

  const teamMemberStyle = {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h1 style={headingStyle}>About Us</h1>
        <p style={{ fontSize: '1.1rem' }}>
          Our company has been providing top-notch services since 1990. 
          We specialize in various fields including technology, marketing, and consultancy. 
          With over 30 years of experience, we've helped thousands of businesses achieve their goals.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Our Mission</h2>
        <p>
          To empower businesses with innovative technology solutions that drive growth, 
          efficiency, and competitive advantage in the digital age.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Our Team</h2>
        <div style={teamGridStyle}>
          <div style={teamMemberStyle}>
            <h3>John Smith</h3>
            <p style={{ color: '#7f8c8d' }}>CEO & Founder</p>
            <p>20+ years in technology leadership</p>
          </div>
          <div style={teamMemberStyle}>
            <h3>Sarah Johnson</h3>
            <p style={{ color: '#7f8c8d' }}>CTO</p>
            <p>Expert in software architecture</p>
          </div>
          <div style={teamMemberStyle}>
            <h3>Mike Davis</h3>
            <p style={{ color: '#7f8c8d' }}>Head of Marketing</p>
            <p>Digital marketing strategist</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;