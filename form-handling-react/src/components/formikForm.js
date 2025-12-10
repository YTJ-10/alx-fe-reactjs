import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegistrationForm.css';

const FormikForm = () => {
  // Validation schema using Yup - with string().required() for each field
  const validationSchema = Yup.object({
    username: Yup.string()
      .string().required('Username is required')  // Added string().required()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters'),
    email: Yup.string()
      .string().required('Email is required')  // Added string().required()
      .email('Invalid email address'),
    password: Yup.string()
      .string().required('Password is required')  // Added string().required()
      .min(6, 'Password must be at least 6 characters')
  });

  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Mock API function
  const mockApiCall = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    console.log('Submitting to API (Formik):', data);
    
    return {
      success: true,
      message: 'Registration successful!',
      data: data
    };
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await mockApiCall(values);
      setStatus({ message: response.message, type: 'success' });
      
      // Reset form on successful submission
      if (response.success) {
        resetForm();
      }
    } catch (error) {
      setStatus({ message: 'Registration failed. Please try again.', type: 'error' });
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
        {({ isSubmitting, status, errors, touched }) => (
          <Form className="registration-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className={errors.username && touched.username ? 'error-input' : ''}
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="span" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={errors.email && touched.email ? 'error-input' : ''}
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="span" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={errors.password && touched.password ? 'error-input' : ''}
                placeholder="Enter password"
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
              <div className={`submit-message ${status.type === 'success' ? 'success' : 'error'}`}>
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