import React from 'react';
// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Row, Col, Input, Form } from 'antd';

// const initialFormState = {};
function InputForm() {
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          social: {
            facebook: '',
            twitter: '',
          },
          /** { email, social } */
        }}
        onSubmit={(values, actions) => {
          //   MyImaginaryRestApiCall(user.id, values).then(
          //     updatedUser => {
          //       actions.setSubmitting(false);
          //       updateUser(updatedUser);
          //       onClose();
          //     },
          //     error => {
          //       actions.setSubmitting(false);
          //       actions.setErrors(transformMyRestApiErrorsToAnObject(error));
          //       actions.setStatus({ msg: 'Set some arbitrary status or data' });
          //     },
          //   );
          console.log('values', values);
          console.log('actions', actions);
        }}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          //   console.log('values', values);
          console.log('errors', errors);
          return (
            <form onSubmit={handleSubmit}>
              <Form.Item label="Email">
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="your email"
                />
                {errors.email && touched.email && <div>{errors.email}</div>}
              </Form.Item>
              <Form.Item label="Facebook">
                <Input
                  type="text"
                  name="social.facebook"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.social.facebook}
                />
                {errors.social &&
                  errors.social.facebook &&
                  touched.facebook && <div>{errors.social.facebook}</div>}
              </Form.Item>
              <Form.Item label="Twitter">
                <Input
                  type="text"
                  name="social.twitter"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.social.twitter}
                />
                {errors.social && errors.social.twitter && touched.twitter && (
                  <div>{errors.social.twitter}</div>
                )}
              </Form.Item>
              {status && status.msg && <div>{status.msg}</div>}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          );
        }}
      />
    </div>
  );
}

InputForm.propTypes = {};

export default InputForm;
