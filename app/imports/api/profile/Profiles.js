import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const profilesName = 'Profiles';

/** Define a Mongo collection to hold the data. */
const Profiles = new Mongo.Collection(profilesName);

/** Define a schema to specify the structure of each document in the collection. */
const ProfileSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  major: String,
  image: String,
  email: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profiles.attachSchema(ProfileSchema);

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema, profilesName };
