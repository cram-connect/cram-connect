import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const profilesPreferencesName = 'ProfilesPreferences';

/** Define a Mongo collection to hold the data. */
const ProfilesPreferences = new Mongo.Collection(profilesPreferencesName);

/** Define a schema to specify the structure of each document in the collection. */
const ProfilePreferenceSchema = new SimpleSchema({
  profile: String,
  preference: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProfilesPreferences.attachSchema(ProfilePreferenceSchema);

/** Make the collection and schema available to other code. */
export { ProfilesPreferences, ProfilePreferenceSchema, profilesPreferencesName };