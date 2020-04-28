import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const preferencesName = 'Preferences';

/** Define a Mongo collection to hold the data. */
const Preferences = new Mongo.Collection(preferencesName);

/**
 * Define a schema to specify the structure of each document in the collection.
 * Names must be unique.
 * */
const PreferenceSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Preferences.attachSchema(PreferenceSchema);

/** Make the collection and schema available to other code. */
export { Preferences, PreferenceSchema, preferencesName };
