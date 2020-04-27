import React from 'react';
import { Card, Image, Feed, Button, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddNote from './AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Place extends React.Component {
  removeItem(docId) {
    /* eslint-disable-next-line */
    if( confirm("Do you really want to delete this study spot?") ) this.props.Places.remove(docId);
  }

  render() {
    return (
        <Card centered>
          <Image src={this.props.place.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.place.name}</Card.Header>
            <Card.Meta>
              <Rating icon='star' defaultRating={this.props.place.rating} maxRating={4} />
            </Card.Meta>
            <Card.Description>
              {this.props.place.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <AddNote owner={this.props.place.owner} placeId={this.props.place._id}/>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Place.propTypes = {
  place: PropTypes.object.isRequired,
  Places: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Place);
