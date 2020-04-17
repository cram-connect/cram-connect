import React from 'react';
import { Grid, Loader, Header, Segment, Image, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles, ProfileSchema } from '../../api/profile/Profiles';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, major, image, _id } = data;
    Profiles.update(_id, { $set: { firstName, lastName, major, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If user wants to edit profile image, prompt for input with swal */
  changeImage(data) {
    const { firstName, lastName, major, image, _id } = data;
    swal({
      title: 'Edit Profile Image?',
      text: 'Enter a new image URL.',
      icon: 'info',
      content: 'input',
      buttons: ['Cancel', 'Submit'],
    })
    .then((imageUrl) => {
      if (imageUrl) {
        Profiles.update(_id, { $set: { firstName, lastName, major, imageUrl } }, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Item updated successfully', 'success')));
      } else {
        swal('Image Update Cancelled');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Profile</Header>
              <Segment>
                <Grid>
                  <Grid.Column width={5}>
                    <Image src={this.props.doc.image} fluid bordered/>
                    <Button color='teal' onClick={(data) => this.changeImage(data)} fluid>
                      Edit Profile Image
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <AutoForm schema={ProfileSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                      <TextField name='firstName'/>
                      <TextField name='lastName'/>
                      <TextField name='major'/>
                      <TextField name='image'/>
                      <SubmitField value='Save Profile'/>
                      <ErrorsField/>
                      <HiddenField name='email'/>
                    </AutoForm>
                  </Grid.Column>
                </Grid>
              </Segment>

          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne({}),
    ready: subscription.ready(),
  };
})(EditProfile);
