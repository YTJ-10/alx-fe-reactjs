function Home() {
  const containerStyle = {
    padding: '40px 20px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const subheadingStyle = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    lineHeight: '1.6'
  };

  const buttonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to TechCorp</h1>
      <p style={subheadingStyle}>
        We are dedicated to delivering excellence in all our services. 
        Innovative solutions for your business growth and success.
      </p>
      <button 
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.backgroundColor = '#c0392b';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = '#e74c3c';
        }}
        onClick={() => alert('Welcome to TechCorp!')}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;