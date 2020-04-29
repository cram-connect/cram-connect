import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesLocations } from '../../api/profile/ProfileLocations';
import { ProfilesQualities } from '../../api/profile/ProfileQualities';
import { Qualities } from '../../api/profile/Qualities';
import { Locations } from '../../api/location/Locations';
import { LocationsQualities } from '../../api/location/LocationQualities';

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

/** Define an interest.  Has no effect if interest already exists. */
function addQuality(quality) {
  Qualities.update({ name: quality }, { $set: { name: quality } }, { upsert: true });
}

/** profiles */
/** Initialize the database with a default data document. */
function addProfile({ firstName, lastName, email, major, qualities, favorites, image }) {
  console.log(`Defining profile ${email}`);
  // Create the profile.
  Profiles.insert({ firstName, lastName, email, major, image });
  // Add interests and projects.
  qualities.map(quality => ProfilesQualities.insert({ profile: email, quality }));
  favorites.map(location => ProfilesLocations.insert({ profile: email, location }));
  // Make sure qualities are defined in the Qualities collection if they weren't already.
  qualities.map(quality => addQuality(quality));
  console.log(`  Adding: ${lastName} (${email})`);
}

/** Define a new location. Error if location already exists.  */
function addLocation({ locationName, qualities, rating, time, description, image }) {
  console.log(`Defining project ${locationName}`);
  Locations.insert({ locationName, rating, time, description, image });
  qualities.map(quality => LocationsQualities.insert({ location: locationName, quality }));
  // Make sure qualities are defined in the Qualities collection if they weren't already.
  qualities.map(quality => addQuality(quality));
}

/** Initialize the collection if empty. */
if (Profiles.find().count() === 0) {
  if (Meteor.settings.defaultProfiles && Meteor.settings.defaultLocations) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating default locations.');
    Meteor.settings.defaultLocations.map(location => addLocation(location));
  }
}
