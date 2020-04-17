import React from 'react';
import { Card, Image, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from './Notes';
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
          <Card.Content>
            <Image
                floated='right'
                size='big'
                src={this.props.place.image}
            />
            <Card.Header>{this.props.place.name}</Card.Header>
            <Card.Meta>{this.props.place.rating}</Card.Meta>
            <Card.Description>
              {this.props.place.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.place._id}`}>Edit</Link>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddNote owner={this.props.place.owner} contactId={this.props.place._id}/>
          </Card.Content>
          <Card.Content extra>
            <Button onClick={() => { this.removeItem(this.props.place._id); }}>Delete</Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Place.propTypes = {
  place: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  Places: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Place);
