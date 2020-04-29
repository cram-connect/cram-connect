import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesLocations, profilesLocationsName } from '../../api/profile/LocationQualities';
import { ProfilesQualities, profilesQualitiesName } from '../../api/profile/ProfileQualities';
import { Qualities, qualitiesName } from '../../api/profile/Qualities';
import { Locations, locationsName } from '../../api/location/Locations';
import { LocationsQualities, locationsQualitiesName } from '../../api/location/LocationQualities';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Contacts', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ContactsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Notes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.find({ owner: username });
  }
  return this.ready();
});


/** Profiles */
/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish(profilesName, function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.find({ email: username });
  }
  return this.ready();
});

/** Define a publication to publish this collection. */
Meteor.publish(profilesQualitiesName, () => ProfilesQualities.find());

/** Define a publication to publish this collection. */
Meteor.publish(profilesLocationsName, () => ProfilesLocations.find());

/** Define a publication to publish all location qualities. */
Meteor.publish(qualitiesName, () => Qualities.find());

/** Define a publication to publish all projects. */
Meteor.publish(locationsName, () => Locations.find());

Meteor.publish(locationsQualitiesName, () => LocationsQualities.find());
