import { Meteor } from 'meteor/meteor';
import { Profiles, profilesName } from '../../api/profile/Profiles';
import { ProfilesLocations, profilesLocationsName } from '../../api/profile/ProfileLocations';
import { ProfilesQualities, profilesQualitiesName } from '../../api/profile/ProfileQualities';
import { Qualities, qualitiesName } from '../../api/profile/Qualities';
import { Locations, locationsName } from '../../api/location/Locations';
import { LocationsQualities, locationsQualitiesName } from '../../api/location/LocationQualities';

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
