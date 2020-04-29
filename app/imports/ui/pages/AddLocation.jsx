
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Locations } from '../../api/location/Locations';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  locationName: String,
  rating: Number,
  time: String,
  description: String,
  image: String,
});

/** Renders the Page for adding a document. */
class AddLocation extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { locationName, rating, time, description, image } = data;
    const owner = Meteor.user().username;
    Locations.insert({ locationName, rating, time, description, image, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Location added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const addLocHeader = { paddingTop: '15px', color: 'white', fontSize: '36px', fontFamily: 'Oswald',
      marginBottom: '15px' };
    let fRef = null;
    return (
        <Grid container centered>
            <Grid.Column>
              <div style={addLocHeader}>
                <Header as="h2" textAlign="center"> <font style={addLocHeader}>Add a New Location</font> </Header>
              </div>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <TextField name='locationName'/>
                  <TextField name='rating'/>
                  <TextField name='image'/>
                  <TextField name='description'/>
                  <TextField name='time'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
        </Grid>
    );
  }
}

export default AddLocation;
