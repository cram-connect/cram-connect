import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, major, image, email, password } = this.state;
    Accounts.createUser({ email, username: email, password },
        (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container>
          <Grid textAlign="left" color='white'>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>
                Register your account
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Group widths='equal'>
                    <Form.Input
                        label="First Name"
                        name="firstName"
                        type="firstName"
                        placeholder="First name"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        type="lastName"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                        label="Major"
                        name="major"
                        type="major"
                        placeholder="Major"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Image URL"
                        name="image"
                        placeholder="Image URL"
                        type="url"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Input
                      label="Preferences"
                      name="preference"
                      type="preference"
                      placeholder="Preferences"
                      onChange={this.handleChange}
                  />
                  <Grid columns={2} centered>
                    <Grid.Column>
                      <Form.Button animated='fade' fluid>
                        <Button.Content hidden>Let&apos;s Get Crammin&apos;</Button.Content>
                        <Button.Content visible>Submit</Button.Content>
                      </Form.Button>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
