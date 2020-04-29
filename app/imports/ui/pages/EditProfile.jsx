import React from 'react';
import { Grid, Loader, Header, Segment, Image, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../../forms/controllers/MultiSelectField';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles, profilesName } from '../../api/profile/Profiles';
import { ProfilesLocations, profilesLocationsName } from '../../api/profile/ProfileLocations';
import { ProfilesQualities, profilesQualitiesName } from '../../api/profile/ProfileQualities';
import { Qualities, qualitiesName } from '../../api/profile/Qualities';
import { Locations, locationsName } from '../../api/location/Locations';
import { updateProfileMethod } from '../../startup/both/Methods';

const makeSchema = (allQualities, allLocations) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  major: { type: String, label: 'Major', optional: true },
  image: { type: String, label: 'Picture URL', optional: true },
  qualities: { type: Array, label: 'Favorite Spot Qualities', optional: true },
  'qualities.$': { type: String, allowedValues: allQualities },
  locations: { type: Array, label: 'Favorite Cram Spots', optional: true },
  'locations.$': { type: String, allowedValues: allLocations },
});

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')
    ));
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
    const allQualities = _.pluck(Qualities.find().fetch(), 'name');
    const allLocations = _.pluck(Locations.find().fetch(), 'locationName');
    const formSchema = makeSchema(allQualities, allLocations);
    // user information setup
    const qualities = _.pluck(ProfilesQualities.find({ profile: email }).fetch(), 'quality');
    const locations = _.pluck(ProfilesLocations.find({ profile: email }).fetch(), 'location');
    // profile filter handled in Publications
    // referred to as doc
    // create model
    const model = _.extend({}, this.props.doc, { qualities, locations });
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
                    <AutoForm schema={formSchema} model={model} onSubmit={data => this.submit(data)}>
                      <TextField name='firstName' showInlineError={true} placeholder={'First Name'}/>
                      <TextField name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                      <TextField name='email' showInlineError={true} placeholder={'Email'} disabled/>
                      <TextField name='major' showInlineError={true} placeholder={'Major'}/>
                      <TextField name='image' showInlineError={true} placeholder={'Image URL'} disabled/>
                      <MultiSelectField name='qualities' showInlineError={true} placeholder={'Qualities'}/>
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
  const sub1 = Meteor.subscribe(profilesName);
  const sub2 = Meteor.subscribe(locationsName);
  const sub3 = Meteor.subscribe(qualitiesName);
  const sub4 = Meteor.subscribe(profilesLocationsName);
  const sub5 = Meteor.subscribe(profilesQualitiesName);
  return {
    doc: Profiles.findOne({}),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(EditProfile);
