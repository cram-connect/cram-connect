import React from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Grid, Card, Loader, Button, Checkbox, List, Dropdown, Menu, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Location from '../components/Locations';
import { Locations, locationsName } from '../../api/location/Locations';
import { LocationsQualities, locationsQualitiesName } from '../../api/location/LocationQualities';

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

/** Location items */
const source = _.times(6, () => ({
  title: Locations.locationName,
  description: Locations.description,
  image: Locations.image,
  rating: Locations.rating,
}));

const initialState = { isLoading: false, results: [], value: '' };

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SearchPage extends React.Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { isLoading, value, results } = this.state;

    const allLocations = Locations.find().fetch();
    console.log(allLocations);
    console.log(this.props.locations);

  return (
        <Grid centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Favorites</Header>
            <Card.Group>
              {this.props.locations.map((spot, index) => <Location key={index}
                                                                       spot={spot}
                                                                       Locations={Locations} />)}
            </Card.Group>
          </Grid.Column>
        </Grid>
    );
  }
}

/** qualities={this.props.locationqualities.filter(quality => (quality.location === location.location))} */

/** Require an array of Stuff documents in the props. */
SearchPage.propTypes = {
  locations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  locationqualities: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to subscriptions.
  const subscription = Meteor.subscribe('Locations');
  const subscription2 = Meteor.subscribe('LocationQualities');
  return {
    locations: Locations.find({}).fetch(),
    locationqualities: LocationsQualities.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(SearchPage);
