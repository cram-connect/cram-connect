import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Button, Container } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '2px', color: 'white' };
    return (
        <div className="ui center aligned container">
          <Menu style={menuStyle} attached="top" borderless inverted>
            <Container>
              <Menu.Item as={NavLink} activeClassName="" exact to="/">
                <Header inverted as='h1'>Cram Connect</Header>
              </Menu.Item>
              {this.props.currentUser ? (
                  // eslint-disable-next-line max-len
                  [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add' inverted='true'>Add Contact
                  </Menu.Item>,
                    <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List
                      Contacts</Menu.Item>]
              ) : ''}
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
              ) : ''}
              <Menu.Item position="right">
                {this.props.currentUser === '' ? (
                    <Button positive pointing="top right" icon={'large user'} as={NavLink} exact to="/signin">
                    </Button>
                ) : (
                    <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon="edit" text="Edit Profile" as={NavLink} exact to="/profile"/>
                        <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                      </Dropdown.Menu>
                    </Dropdown>
                )}
              </Menu.Item>
            </Container>
          </Menu>
          <hr/>
        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
