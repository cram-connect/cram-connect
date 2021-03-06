import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Grid, Card, Loader, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FavoriteLocations from '../components/FavoriteLocations';
import { Locations } from '../../api/location/Locations';
import { LocationsQualities } from '../../api/location/LocationQualities';
import { ProfilesLocations } from '../../api/profile/ProfileLocations';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Favorites extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const email = Meteor.user().username;
    /**  pull locationsID associations */
    const userLocationsIds = _.map(ProfilesLocations.find({ profile: email }).fetch(), function (locationId) { return { _id: locationId._id, location: locationId.location };});
    // console.log(userLocationsIds);
    /** check locations associated with specific user */
    const userLocations = _.pluck(ProfilesLocations.find({ profile: email }).fetch(), 'location');
    // console.log(userLocations);
    /**  filter out location information that is not relevant to user */
    const favorites = _.filter(this.props.locations,
        (locationData) => _.contains(userLocations, locationData.locationName));
    // console.log(favorites);

  return (
        <Grid centered container>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Favorites</Header>
            <Card.Group centered>
              {favorites.map((spot, index) => <FavoriteLocations key={index}
                                                                  spot={spot}
                                                                  userLocationsIds={userLocationsIds}
                                                                  ProfilesLocations={ProfilesLocations}
                                                                  Locations={Locations} />)}
            </Card.Group>
          </Grid.Column>
        </Grid>
    );
  }
}

/** qualities={this.props.locationqualities.filter(quality => (quality.location === location.location))} */

/** Require an array of Stuff documents in the props. */
Favorites.propTypes = {
  locations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  locationqualities: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to subscriptions.
  const subscription = Meteor.subscribe('Locations');
  const subscription2 = Meteor.subscribe('LocationQualities');
  const subscription3 = Meteor.subscribe('ProfilesLocations');
  return {
    locations: Locations.find({}).fetch(),
    locationqualities: LocationsQualities.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(Favorites);
