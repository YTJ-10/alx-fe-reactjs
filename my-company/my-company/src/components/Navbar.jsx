import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: '0 2rem 0 0', fontSize: '1.5rem' }}>
          TechCorp
        </h1>
        <div>
          <Link 
            to="/" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            About
          </Link>
          <Link 
            to="/services" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#34495e'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;