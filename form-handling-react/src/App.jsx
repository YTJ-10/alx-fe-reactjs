import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';  // Changed to lowercase
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React Form Handling</h1>
      <div className="forms-container">
        <RegistrationForm />
        <FormikForm />
      </div>
    </div>
  );
}

export default App;