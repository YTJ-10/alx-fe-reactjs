import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  // State for form fields - using separate useState hooks
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

  // Handle input changes - individual handlers
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Clear error for this field when user starts typing
    if (errors.username) {
      setErrors({
        ...errors,
        username: '',
      });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error for this field when user starts typing
    if (errors.email) {
      setErrors({
        ...errors,
        email: '',
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error for this field when user starts typing
    if (errors.password) {
      setErrors({
        ...errors,
        password: '',
      });
    }
  };

  // Alternative: Single handler approach (commented out)
  /*
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update the appropriate state
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
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

  // Basic validation
  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '' };

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data
      const formData = {
        username,
        email,
        password,
      };

      // Simulate API call to mock endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitMessage(`Registration successful! User ID: ${data.id || 'Mock ID'}`);
        // Reset form
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

  return (
    <div className="registration-container">
      <h2>User Registration (Controlled Components)</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}  // Controlled component: value bound to state
            onChange={handleUsernameChange}
            // Alternative: onChange={handleInputChange}
            className={errors.username ? 'error' : ''}
            placeholder="Enter your username"
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}  // Controlled component: value bound to state
            onChange={handleEmailChange}
            // Alternative: onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}  // Controlled component: value bound to state
            onChange={handlePasswordChange}
            // Alternative: onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;