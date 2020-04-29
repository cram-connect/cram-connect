import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const profilesQualitiesName = 'ProfileQualities';

/** Define a Mongo collection to hold the data. */
const ProfilesQualities = new Mongo.Collection(profilesQualitiesName);

/** Define a schema to specify the structure of each document in the collection. */
const ProfileQualitySchema = new SimpleSchema({
  profile: String,
  quality: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProfilesQualities.attachSchema(ProfileQualitySchema);

/** Make the collection and schema available to other code. */
export { ProfilesQualities, ProfileQualitySchema, profilesQualitiesName };
