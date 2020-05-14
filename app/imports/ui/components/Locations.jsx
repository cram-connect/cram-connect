import React from 'react';
import { Card, Container, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class Location extends React.Component {
  removeItem(docId) {
    /* eslint-disable-next-line */
    if( confirm("Do you really want to delete this study spot?") ) this.props.Locations.remove(docId);
  }

  /** Remove the profile-location link to remove favorite */
  removeFavorite(docID) {
    console.log(`deleting item: ${docID}`);
    swal({
      title: 'Are you sure?',
      text: 'This is a really cool spot!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            this.props.ProfilesLocations.remove(docID);
            swal('Poof! Your favorite has been removed!', {
              icon: 'success',
            });
          } else {
            swal('Got it. Your favorite is not going anywhere!');
          }
        });
  }

  render() {
    return (
      <Link to={`/location/${this.props.spot._id}`}>
        <Card centered>
          <Image src={this.props.spot.image} wrapped ui={true} />
          <Card.Content>
            <Card.Header>{this.props.spot.locationName}</Card.Header>
            <Card.Meta>
              <Rating icon='star' disabled defaultRating={this.props.spot.rating} maxRating={4} />
            </Card.Meta>
            <Card.Meta>
              {this.props.spot.time}
            </Card.Meta>
            <Card.Description>
              {this.props.spot.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button floated='right' animated onClick={() => this.removeFavorite(locationID._id)}>
              <Button.Content visible>Remove</Button.Content>
              <Button.Content hidden>
                <Icon name='heartbeat'/>
              </Button.Content>
            </Button>
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

/** qualities: PropTypes.array.isRequired, */

/** Require a document to be passed to this component. */
Location.propTypes = {
  spot: PropTypes.object.isRequired,
  userLocationsIds: PropTypes.array.isRequired,
  Locations: PropTypes.object.isRequired,
  ProfilesLocations: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Location);
