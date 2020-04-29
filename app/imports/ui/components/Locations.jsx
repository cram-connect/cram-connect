import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Location extends React.Component {
  removeItem(docId) {
    /* eslint-disable-next-line */
    if( confirm("Do you really want to delete this study spot?") ) this.props.Locations.remove(docId);
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image src={this.props.location.image} wrapped ui={false} />
            <Card.Header>{this.props.location.state}</Card.Header>
            <Card.Meta>
              <Rating icon='star' defaultRating={this.props.location.rating} maxRating={4} />
            </Card.Meta>
            <Card.Meta>
              {this.props.qualities}
            </Card.Meta>
            <Card.Meta>
              {this.props.location.time}
            </Card.Meta>
            <Card.Description>
              {this.props.location.description}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Location.propTypes = {
  location: PropTypes.object.isRequired,
  qualities: PropTypes.array.isRequired,
  Locations: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Location);
