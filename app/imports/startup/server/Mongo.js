import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Locations } from '../../api/location/Locations';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addContact(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.insert(data);
}

/** Initialize the collection if empty. */
if (Contacts.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}

/** Initialize the database with a default data document. */
function addLocation(data) {
  console.log(`  Adding: ${data.locationName} (${data.owner})`);
  Locations.insert(data);
}

/** Initialize the collection if empty. */
if (Locations.find().count() === 0) {
  if (Meteor.settings.defaultLocations) {
    console.log('Creating default locations.');
    Meteor.settings.defaultLocations.map(data => addLocation(data));
  }
}
