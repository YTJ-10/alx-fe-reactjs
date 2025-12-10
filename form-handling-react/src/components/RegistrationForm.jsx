import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State for form errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // BASIC VALIDATION LOGIC - Check that no fields are left empty
  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '' };

    // BASIC VALIDATION: Check that no fields are left empty
    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    // Extended validation (optional - beyond basic requirements)
    if (valid) {
      // Additional username validation
      if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
        valid = false;
      }

      // Additional email validation
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        valid = false;
      }

      // Additional password validation
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // Alternative: Simplified basic validation ONLY (as per requirements)
  const validateFormBasic = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '' };

    // SIMPLE BASIC VALIDATION - Just check for empty fields
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password.trim()) {
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

    // Validate form using basic validation
    if (!validateFormBasic()) {
      return;
    }

    setIsSubmitting(true);

    try {
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
        setFormData({
          username: '',
          email: '',
          password: '',
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setSubmitMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to check if all fields are empty (for UI)
  const areAllFieldsEmpty = () => {
    return !formData.username && !formData.email && !formData.password;
  };

  return (
    <div className="registration-container">
      <h2>User Registration (Controlled Components)</h2>
      <p className="form-description">
        Basic validation: Checks that no fields are left empty before submission.
      </p>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? 'error' : ''}
            placeholder="Enter your username"
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
          {!formData.username && !errors.username && (
            <span className="field-hint">Required field</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          {!formData.email && !errors.email && (
            <span className="field-hint">Required field</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          {!formData.password && !errors.password && (
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
              // Clear form button
              setFormData({ username: '', email: '', password: '' });
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

        {/* Validation status indicator */}
        <div className="validation-status">
          <h4>Validation Status:</h4>
          <div className="status-item">
            <span className={`status-indicator ${formData.username ? 'valid' : 'invalid'}`}></span>
            <span>Username: {formData.username ? '✓ Provided' : '✗ Required'}</span>
          </div>
          <div className="status-item">
            <span className={`status-indicator ${formData.email ? 'valid' : 'invalid'}`}></span>
            <span>Email: {formData.email ? '✓ Provided' : '✗ Required'}</span>
          </div>
          <div className="status-item">
            <span className={`status-indicator ${formData.password ? 'valid' : 'invalid'}`}></span>
            <span>Password: {formData.password ? '✓ Provided' : '✗ Required'}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;