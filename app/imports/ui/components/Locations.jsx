import React from 'react';
import { Card, Container, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class Location extends React.Component {
  removeItem(docId) {
    /* eslint-disable-next-line */
    if( confirm("Do you really want to delete this study spot?") ) this.props.Locations.remove(docId);
  }

  render() {
    return (
        <Link to={`/location/${this.props.spot._id}`}>
          <Card centered>
            <Image src={this.props.spot.image} wrapped ui={true} style={{ height: 250 }}/>
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
          </Card>
        </Link>
    );
  }
}

/** qualities: PropTypes.array.isRequired, */

/** Require a document to be passed to this component. */
Location.propTypes = {
  spot: PropTypes.object.isRequired,
  Locations: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Location);
