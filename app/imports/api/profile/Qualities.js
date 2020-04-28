import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const qualitiesName = 'Qualities';

/** Define a Mongo collection to hold the data. */
const Qualities = new Mongo.Collection(qualitiesName);

/**
 * Define a schema to specify the structure of each document in the collection.
 * Names must be unique.
 * */
const QualitySchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Qualities.attachSchema(QualitySchema);

/** Make the collection and schema available to other code. */
export { Qualities, QualitySchema, qualitiesName };
