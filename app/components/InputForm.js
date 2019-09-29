import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

function InputForm(props) {
  const handleSubmit = e => {
    e.preventDefault();
    alert('submitted');
  };
  const handleChange = e => {
    const { name, value } = e.target;
    console.log('name, value', name, value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Input
          onChange={handleChange}
          name="firstName"
          label="First name"
          placeholder="First Name"
          width={6}
          // error="nononononon"
        />
        <Form.Input label="Last Name" placeholder="Last Name" width={10} />
        <Form.Input label="Email" placeholder="Last Name" width={8} />
      </Form.Group>
    </Form>
  );
}

export default InputForm;
