import { useState } from 'react';

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const containerStyle = {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };

  const serviceCardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const detailStyle = {
    backgroundColor: '#ecf0f1',
    padding: '2rem',
    borderRadius: '8px',
    marginTop: '2rem',
    borderLeft: '4px solid #3498db'
  };

  const services = [
    {
      id: 1,
      title: 'Technology Consulting',
      description: 'Strategic IT guidance and digital transformation consulting.',
      details: 'Our technology consulting services help businesses leverage cutting-edge technologies to streamline operations and drive innovation.',
      icon: '💻'
    },
    {
      id: 2,
      title: 'Market Analysis',
      description: 'In-depth market research and competitive intelligence.',
      details: 'Gain valuable insights into your market with our comprehensive analysis services.',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Product Development',
      description: 'End-to-end product design and development services.',
      details: 'From concept to launch, our product development team creates innovative solutions.',
      icon: '🚀'
    }
  ];

  return (
    <div style={containerStyle}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c3e50', 
        marginBottom: '1rem' 
      }}>
        Our Services
      </h1>
      <p style={{ 
        textAlign: 'center', 
        fontSize: '1.2rem', 
        color: '#7f8c8d',
        maxWidth: '800px',
        margin: '0 auto 2rem'
      }}>
        Comprehensive solutions to drive your business forward
      </p>

      <div style={gridStyle}>
        {services.map(service => (
          <div
            key={service.id}
            style={{
              ...serviceCardStyle,
              ...(selectedService === service.id ? { 
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                borderColor: '#3498db'
              } : {})
            }}
            onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>{service.title}</h3>
            <p style={{ color: '#7f8c8d' }}>{service.description}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <div style={detailStyle}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
            {services.find(s => s.id === selectedService)?.title}
          </h3>
          <p style={{ lineHeight: '1.6' }}>
            {services.find(s => s.id === selectedService)?.details}
          </p>
          <button
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              marginTop: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => alert('Service inquiry sent!')}
          >
            Learn More
          </button>
        </div>
      )}
    </div>
  );
}

export default Services;