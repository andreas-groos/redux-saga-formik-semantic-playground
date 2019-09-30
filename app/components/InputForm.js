import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Checkbox, Grid } from 'semantic-ui-react';
import { Formik, FieldArray, Field } from 'formik';
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

const initialFormState = {
  email: '',
  firstName: '',
  lastName: '',
  todos: [
    { name: 'one', task: 'b', done: true },
    { name: 'two', task: 'a', done: false },
  ],
};

function InputForm() {
  const handleSubmit = e => {
    // e.preventDefault();
    alert('submitted');
  };

  return (
    <div>
      <Formik
        initialValues={initialFormState}
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
              <Form.Group>
                <FieldArray
                  name="todos"
                  render={arrayHelpers => (
                    <div>
                      {values.todos.map((todo, index) => (
                        <div key={index}>
                          <Grid columns={4}>
                            <Grid.Row>
                              <Grid.Column>
                                <Form.Input
                                  label="Name"
                                  name={`todos.${index}.name`}
                                  onChange={handleChange}
                                  value={values.todos[index].name}
                                />
                              </Grid.Column>
                              <Grid.Column>
                                <Form.Input
                                  label="Task"
                                  name={`todos.${index}.task`}
                                  onChange={handleChange}
                                  value={values.todos[index].task}
                                />
                              </Grid.Column>
                              <Grid.Column>
                                <Form.Input label="done?">
                                  <Checkbox
                                    id={`todos.${index}.done`}
                                    name={`todos.${index}.done`}
                                    type="checkbox"
                                    value={values.todos[index].done}
                                    checked={values.todos[index].done}
                                    onChange={handleChange}
                                  />
                                </Form.Input>
                              </Grid.Column>
                              <Grid.Column>
                                <Button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </Button>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(index, {
                                      name: '',
                                      task: '',
                                      done: false,
                                    })
                                  }
                                >
                                  +
                                </Button>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </div>
                      ))}
                    </div>
                  )}
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
