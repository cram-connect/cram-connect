import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Places = new Mongo.Collection('Places');

/** Define a schema to specify the structure of each document in the collection. */
const PlaceSchema = new SimpleSchema({
  image: String,
  name: String,
  rating: String,
  description: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Places.attachSchema(PlaceSchema);

/** Make the collection and schema available to other code. */
export { Places, PlaceSchema };
