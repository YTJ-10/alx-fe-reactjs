import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('controlled');

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registration Forms</h1>
        <div className="form-selector">
          <button 
            onClick={() => setActiveForm('controlled')}
            className={activeForm === 'controlled' ? 'active' : ''}
          >
            Controlled Components
          </button>
          <button 
            onClick={() => setActiveForm('formik')}
            className={activeForm === 'formik' ? 'active' : ''}
          >
            Formik
          </button>
        </div>
      </header>
      
      <main className="App-main">
        {activeForm === 'controlled' ? <RegistrationForm /> : <FormikForm />}
        
        <div className="comparison">
          <h3>Comparison</h3>
          <div className="comparison-grid">
            <div className="comparison-item">
              <h4>Controlled Components</h4>
              <ul>
                <li>Manual state management with useState</li>
                <li>Custom validation logic</li>
                <li>Explicit event handlers</li>
                <li>More boilerplate code</li>
              </ul>
            </div>
            <div className="comparison-item">
              <h4>Formik</h4>
              <ul>
                <li>Built-in form state management</li>
                <li>Integrated validation with Yup</li>
                <li>Less boilerplate code</li>
                <li>Form, Field, and ErrorMessage components</li>
                <li>Better for complex forms</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;