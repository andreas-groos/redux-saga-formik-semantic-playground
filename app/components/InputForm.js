import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

export const DisplayFormikState = props => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

function InputForm() {
  const handleSubmit = e => {
    // e.preventDefault();
    alert('submitted');
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', firstName: 'Andreas', lastName: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            actions.resetForm();
            actions.setFieldValue('firstName', 'aaa');
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Required'),
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Input
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  label="First name"
                  placeholder="First Name"
                  width={6}
                  onBlur={handleBlur}
                />
                <div>
                  {errors.firstName && touched.firstName && (
                    <div className="input-feedback">{errors.firstName}</div>
                  )}
                </div>
                <Form.Input
                  onChange={handleChange}
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  placeholder="Last Name"
                  width={10}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
                <Form.Input
                  onChange={handleChange}
                  label="Email"
                  value={values.email}
                  name="email"
                  placeholder="Last Name"
                  width={8}
                  onBlur={handleBlur}
                  error={
                    errors.email && touched.email
                      ? {
                          content: 'Please enter valid email',
                          pointing: 'above',
                        }
                      : null
                  }
                />
              </Form.Group>

              <Button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>

              <DisplayFormikState {...props} />
            </Form>
          );
        }}
      </Formik>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default InputForm;
