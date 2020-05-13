
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Locations } from '../../api/location/Locations';

const property = { color: 'grey', fontSize: '18px', fontFamily: 'Lexend Deca' };

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  locationName: { type: String, label: <font style={property}>Name of Location</font>, optional: true },
  rating: { type: Number, label: <font style={property}>Rating</font>, optional: true },
  time: { type: String, label: <font style={property}>Hours of Operation</font>, optional: true },
  description: { type: String, label: <font style={property}>Description</font>, optional: true },
  image: { type: String, label: <font style={property}>Image URL</font>, optional: true },
  latitude: { type: Number, label: <font style={property}>Latitude (Must be between -90&#xb0; to +90&#xb0;)</font>,
    optional: true },
  longitude: { type: Number, label: <font style={property}>Longitude (Must be between -180&#xb0; to +180&#xb0;)</font>,
    optional: true },
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
                  <TextField name='locationName' showInlineError={true} placeholder={'e.g., Starbucks Coffee'}/>
                  <TextField name='rating' showInlineError={true} placeholder={'e.g. 5'}/>
                  <TextField name='image' showInlineError={true} placeholder={'e.g. https://starbucks.com/logo.png'}/>
                  <TextField name='description' showInlineError={true}
                             placeholder={'e.g. A peaceful place that smells like coffee.'}/>
                  <TextField name='time' showInlineError={true}
                             placeholder={'e.g. Monday-Friday: 4:30am - 11:30pm'}/>
                  <TextField name='latitude' showInlineError={true}
                             placeholder={'e.g. -45'}/>
                  <TextField name='longitude'
                             showInlineError={true} placeholder={'e.g. 135'}/>
                  <SubmitField centered value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
        </Grid>
    );
  }
}

export default AddLocation;
