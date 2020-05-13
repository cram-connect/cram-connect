import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesLocations } from '../../api/profile/ProfileLocations';
import { ProfilesQualities } from '../../api/profile/ProfileQualities';
import { Qualities } from '../../api/profile/Qualities';
import { Locations } from '../../api/location/Locations';
import { LocationsQualities } from '../../api/location/LocationQualities';

/* eslint-disable no-console */

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
  _.map(qualities, (quality) => ProfilesQualities.insert({ profile: email, quality }));
  _.map(favorites, (location) => ProfilesLocations.insert({ profile: email, location }));
  // Make sure qualities are defined in the Qualities collection if they weren't already.
  _.map(qualities, (quality) => addQuality(quality));
  console.log(`  Adding: ${lastName} (${email})`);
}

/** Define a new location. Error if location already exists.  */
function addLocation({ locationName, qualities, rating, time, description, image, lat, lng }) {
  console.log(`Defining location ${locationName}`);
  Locations.insert({ locationName, rating, time, description, image, lat, lng });
  _.map(qualities, (quality) => LocationsQualities.insert({ location: locationName, quality }));
  // Make sure qualities are defined in the Qualities collection if they weren't already.
  _.map(qualities, (quality) => addQuality(quality));
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

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 * && (Meteor.users.find().count() < 7)
 */
/*
if ((Meteor.settings.loadAssetsFile)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.locations.map(location => addLocation(location));
} */
