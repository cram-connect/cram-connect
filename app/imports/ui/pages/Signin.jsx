import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, Grid, Header, Message } from 'semantic-ui-react';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const loginHeader = { paddingTop: '15px', color: 'white', fontSize: '30px', fontFamily: 'Pacifico' };
    const register = { paddingTop: '15px', color: 'white', fontSize: '20px' };
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header textAlign="center" inverted>
                <font style={loginHeader}>Login to Your Account</font>
              </Header>
              <Form onSubmit={this.submit}>
                <Form.Input focus
                    // label="Email"
                            icon="at"
                            iconPosition="left"
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            onChange={this.handleChange}
                />
                <Form.Input focus
                    // label="Password"
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                />
                <center><Form.Button basic inverted content="Go"/></center>
              </Form>
              <br/>
              <Divider inverted></Divider>
              <center>
                <font style={register}>Don&#39;t have an Account?</font>
                <br/>
                <div className="registerNow">
                  <Button basic inverted icon={'user plus'} content="Register Now" as={NavLink} exact to="/signup">
                  </Button>
                </div>
              </center>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Login was not successful"
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
Signin.propTypes = {
  location: PropTypes.object,
};
