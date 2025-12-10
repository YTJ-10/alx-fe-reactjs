import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  // Individual state variables for each form field
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for form errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle input changes with individual handlers
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    // Clear error when user types
    if (errors.username) {
      setErrors({
        ...errors,
        username: '',
      });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user types
    if (errors.email) {
      setErrors({
        ...errors,
        email: '',
      });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Clear error when user types
    if (errors.password) {
      setErrors({
        ...errors,
        password: '',
      });
    }
  };

  // Alternative: Single handler using name attribute
  /*
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Use switch or if-else to update the correct state
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  */

  // Basic validation logic - check that no fields are left empty
  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '' };

    // Check if username is empty
    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    // Check if email is empty
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    // Check if password is empty
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    // Validate form - basic check for empty fields
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API call
      const userData = {
        username: username,
        email: email,
        password: password,
      };

      // Simulate API call to mock endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitMessage(`Registration successful! User ID: ${data.id || 'Mock ID'}`);
        // Reset form by clearing individual states
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setSubmitMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if all fields are empty (for disabling clear button)
  const areAllFieldsEmpty = () => {
    return !username && !email && !password;
  };

  return (
    <div className="registration-container">
      <h2>User Registration (Controlled Components)</h2>
      <p className="form-description">
        This form uses controlled components with individual state variables for each field.
        Basic validation ensures no fields are left empty before submission.
      </p>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username} {/* Controlled component: value bound to state */}
            onChange={handleUsernameChange}
            className={errors.username ? 'error' : ''}
            placeholder="Enter your username"
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
          {!username && !errors.username && (
            <span className="field-hint">Required field</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email} {/* Controlled component: value bound to state */}
            onChange={handleEmailChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          {!email && !errors.email && (
            <span className="field-hint">Required field</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} {/* Controlled component: value bound to state */}
            onChange={handlePasswordChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          {!password && !errors.password && (
            <span className="field-hint">Required field</span>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              // Clear all individual state variables
              setUsername('');
              setEmail('');
              setPassword('');
              setErrors({ username: '', email: '', password: '' });
              setSubmitMessage('');
            }}
            className="clear-btn"
            disabled={areAllFieldsEmpty()}
          >
            Clear Form
          </button>
        </div>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
            {submitMessage}
          </div>
        )}

        <div className="state-display">
          <h4>Current Form State:</h4>
          <div className="state-item">
            <strong>Username:</strong> <code>"{username}"</code>
          </div>
          <div className="state-item">
            <strong>Email:</strong> <code>"{email}"</code>
          </div>
          <div className="state-item">
            <strong>Password:</strong> <code>"{'•'.repeat(password.length)}"</code>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;