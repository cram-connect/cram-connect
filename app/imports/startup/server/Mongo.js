import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Places } from '../../api/place/Places';

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
function addPlace(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Places.insert(data);
}

/** Initialize the collection if empty. */
if (Places.find().count() === 0) {
  if (Meteor.settings.defaultPlaces) {
    console.log('Creating default places.');
    Meteor.settings.defaultPlaces.map(data => addPlace(data));
  }
}
