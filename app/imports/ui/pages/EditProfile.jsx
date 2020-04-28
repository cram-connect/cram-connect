import React from 'react';
import { Grid, Loader, Header, Segment, Image, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles, ProfileSchema } from '../../api/profile/Profiles';

const makeSchema = (allPreferences, allLocations) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  major: { type: String, label: 'Major', optional: true },
  image: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allPreferences },
  projects: { type: Array, label: 'Projects', optional: true },
  'projects.$': { type: String, allowedValues: allLocations },
});

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
  changeImage() {
    swal({
      title: 'Edit Profile Image?',
      text: 'Enter a new image URL.',
      icon: 'info',
      content: 'input',
      buttons: ['Cancel', 'Submit'],
    })
    .then((imageUrl) => {
      if (imageUrl) {
        Profiles.update(this.props.doc._id, { $set: { image: imageUrl } }, (error) => (error ?
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
    const email = Meteor.user().username;
    // create, prep form schema for uniforms
    // determine all preferences and locations for multiselect lists
    const allPreferences = _.pluck(Preferences.find().fetch(), 'name');
    const allLocations = _.pluck(Locations.find().fetch(), 'name');
    const formSchema = makeSchema(allPreferences, allLocations);
    // user information setup
    const interests = _.pluck(ProfilePreferences.find({ profile: email }).fetch(), 'interest');
    const profile = Profiles.findOne({ email });
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Profile</Header>
              <Segment>
                <Grid>
                  <Grid.Column width={5}>
                    <Image src={this.props.doc.image} fluid bordered/>
                    <Button color='teal' onClick={() => this.changeImage()} fluid>
                      Edit Profile Image
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <AutoForm schema={FormSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                      <TextField name='firstName' showInlineError={true} placeholder={'First Name'}/>
                      <TextField name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                      <TextField name='email' showInlineError={true} placeholder={'Email'} disabled/>
                      <TextField name='major' showInlineEroor={true} placeholder={'Major'}/>
                      <TextField name='image' showInlineError={true} placeholder={'Image URL'}/>
                      <MultiSelectField name='preferences' showInlineError={true} placeholder={'Preferences'}/>
                      <MultiSelectField name='locations' showInlineError={true} placeholder={'Favorite Locations'}/>
                      <SubmitField value='Save Profile'/>
                      <ErrorsField/>
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
  const sub1 = Meteor.subscribe('Profiles');
  const sub2 = Meteor.subscribe('Profiles');
  const sub3 = Meteor.subscribe('Profiles');
  const sub4 = Meteor.subscribe('Profiles');
  const sub5  = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne({}),
    ready: subscription.ready(),
  };
})(EditProfile);
