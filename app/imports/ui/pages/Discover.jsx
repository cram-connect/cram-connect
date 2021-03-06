import React from 'react';
import { Button, Grid, Loader, Rating, Icon, Header, Segment, Image, Container, Label } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { _ } from 'meteor/underscore';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import { Profiles } from '../../api/profile/Profiles';
import { Locations } from '../../api/location/Locations';
import { ProfilesLocations, profilesLocationsName } from '../../api/profile/ProfileLocations';
import { LocationsQualities } from '../../api/location/LocationQualities';

class Location extends React.Component {

  handleClick(location, email) {
    console.log(location, email);
    const exists = ProfilesLocations.find({ profile: email, location: location.locationName }).fetch();
    if (exists.length === 0) {
      ProfilesLocations.insert({ profile: email, location: location.locationName });
    } else {
      ProfilesLocations.remove({ _id: exists[0]._id });
    }

  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const email = Meteor.user().username;
    const favoriteLocations = _.pluck(ProfilesLocations.find({ profile: email }).fetch(), 'location');
    let location;
    do {
      location = _.sample(Locations.find().fetch());
    } while (_.contains(favoriteLocations, location.locationName));
    const locationQuality = _.pluck(LocationsQualities.find({ location: location.locationName }).fetch(), 'quality');
    const number = location.rating;
    let heart;
    if (_.contains(favoriteLocations, location)) {
      heart = 'red';
    } else {
      heart = 'white';
    }
    return (
        <Container>
          <Segment.Group>
            <Segment inverted color='blue' raised>
              <Grid columns='equal' centered>
                <Grid.Column>
                  <Label as='a' color='red' size='massive' ribbon>
                    {location.locationName}
                  </Label>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Button color={heart} onClick={this.handleClick.bind(this, location, email)}>
                    <Icon name='heart'/> Favorite
                  </Button>
                </Grid.Column>
              </Grid>
              <Image
                  id="locationPage"
                  fluid
                  src={location.image}
              />
            </Segment>
            <Segment id="tags" inverted color='blue' raised>
              <Grid columns={3}>
                <Grid.Column width={1} textAlign='left'>
                  <Header as='h3' inverted>Tags:</Header>
                </Grid.Column>
                <Grid.Column>
                  <Label.Group>{_.map(locationQuality, (quality) => <Label as='a' content={quality}/>)}</Label.Group>
                </Grid.Column>
                <Grid.Column id="stars" floated='right' width={2} verticalAlign='middle' textAlign='right'>
                  <Rating disabled size='huge' icon='star' defaultRating={number} maxRating={5}/>
                </Grid.Column>
              </Grid>
            </Segment>
          </Segment.Group>
          <Segment inverted color='blue'>
            <Grid columns={2}>
              <Grid.Column>
                <Header inverted as='h3' dividing>Description</Header>
                <p>{location.description}</p>
              </Grid.Column>
              <Grid.Column>
                <Header inverted as='h3' dividing>Hours of Operation</Header>
                <p>{location.time}</p>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment inverted color='blue'>
            <Map center={[location.lat, location.lng]} zoom='20'>
              <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>
                  {location.locationName}
                </Popup>
              </Marker>
            </Map>
          </Segment>
        </Container>
    );
  }
}

Location.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const docId = match.params._id;
  const sub1 = Meteor.subscribe('Profiles');
  const sub2 = Meteor.subscribe('Locations');
  const sub3 = Meteor.subscribe(profilesLocationsName);
  const sub4 = Meteor.subscribe('LocationQualities');
  return {
    doc: Profiles.findOne(docId),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(Location);
