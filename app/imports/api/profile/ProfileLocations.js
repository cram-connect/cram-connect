import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const profilesLocationsName = 'ProfilesLocations';

/** Define a Mongo collection to hold the data. */
const ProfilesLocations = new Mongo.Collection(profilesLocationsName);

/** Define a schema to specify the structure of each document in the collection. */
const ProfileLocationSchema = new SimpleSchema({
  profile: String,
  location: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProfilesLocations.attachSchema(ProfileLocationSchema);

/** Make the collection and schema available to other code. */
export { ProfilesLocations, ProfileLocationSchema, profilesLocationsName };
