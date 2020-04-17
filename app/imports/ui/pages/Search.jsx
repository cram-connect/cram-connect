import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Input, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Place from '../components/Places';
import { Places } from '../../api/place/Places';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Search extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Input floated='right' size='big' icon='search' placeholder='Search...' />
          <Card.Group>
            {this.props.places.map((place, index) => <Place key={index} place={place} Places={Places}
                notes={this.props.notes.filter(note => (note.placeID === place._id))}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Search.propTypes = {
  places: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  notes: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Places');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    places: Places.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(Search);
