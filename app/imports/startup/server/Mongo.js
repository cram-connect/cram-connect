import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Profiles } from '../../api/profile/Profiles';

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


/** profiles */
/** Initialize the database with a default data document. */
function addProfile(data) {
  console.log(`  Adding: ${data.lastName} (${data.email})`);
  Profiles.insert(data);
}

/** Initialize the collection if empty. */
if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}
