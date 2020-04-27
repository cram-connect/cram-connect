import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Card, Loader, Button, Checkbox, List, Dropdown, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Place from '../components/Places';
import { Places } from '../../api/place/Places';

/** Capacity amount for each place */
const options = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
  { key: 6, text: '6', value: 6 },
  { key: 7, text: '7', value: 7 },
  { key: 8, text: '8', value: 8 },
  { key: 9, text: '9', value: 9 },
  { key: 10, text: '10', value: 10 },
];


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Search extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid centered>
          <Grid.Column width={3}>
            <Button>Free</Button>
            <Button>$</Button>
            <Button>$$</Button>
            <Menu compact>
              <Dropdown text='Capacity' options={options} simple item />
            </Menu>
            <List>
              <List.Item><Checkbox label='Open Now' /></List.Item>
              <List.Item><Checkbox label='On Campus' /></List.Item>
              <List.Item><Checkbox label='Off Campus' /></List.Item>
              <List.Item><Checkbox label='Noisy' /></List.Item>
              <List.Item> <Checkbox label='Quiet' /></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={8}>
            <Card.Group>
              {this.props.places.map((place, index) => <Place key={index} place={place} Places={Places}/>)}
            </Card.Group>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Search.propTypes = {
  places: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Places');
  return {
    places: Places.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Search);
