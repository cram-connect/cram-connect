import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const locationsName = 'Locations';

/** Define a Mongo collection to hold the data. */
const Locations = new Mongo.Collection(locationsName);

/** Define a schema to specify the structure of each document in the collection. */
const LocationSchema = new SimpleSchema({
  locationName: String,
  rating: Number,
  time: String,
  description: String,
  image: String,
  lat: Number,
  lng: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Locations.attachSchema(LocationSchema);

/** Make the collection and schema available to other code. */
export { Locations, LocationSchema, locationsName };
