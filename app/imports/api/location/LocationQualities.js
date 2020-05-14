import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const locationsQualitiesName = 'LocationQualities';

/** Define a Mongo collection to hold the data. */
const LocationsQualities = new Mongo.Collection(locationsQualitiesName);

/** Define a schema to specify the structure of each document in the collection. */
const LocationQualitySchema = new SimpleSchema({
  location: String,
  quality: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
LocationsQualities.attachSchema(LocationQualitySchema);

/** Make the collection and schema available to other code. */
export { LocationsQualities, LocationQualitySchema, locationsQualitiesName };
