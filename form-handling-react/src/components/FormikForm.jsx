import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegistrationForm.css';

const FormikForm = () => {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Simulate API call to mock endpoint (same as before)
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus({
          type: 'success',
          message: `Registration successful! User ID: ${data.id || 'Mock ID'}`,
        });
        resetForm();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error: ${error.message}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>User Registration (Formik)</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="registration-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className={({ error, touched }) => 
                  `form-control ${error && touched ? 'error' : ''}`
                }
              />
              <ErrorMessage name="username" component="span" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={({ error, touched }) => 
                  `form-control ${error && touched ? 'error' : ''}`
                }
              />
              <ErrorMessage name="email" component="span" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className={({ error, touched }) => 
                  `form-control ${error && touched ? 'error' : ''}`
                }
              />
              <ErrorMessage name="password" component="span" className="error-message" />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            {status && (
              <div className={`submit-message ${status.type === 'error' ? 'error' : 'success'}`}>
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;