import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import WebFont from 'webfontloader';

/** Startup the application by rendering the App layout component. */
Meteor.startup(() => {
  WebFont.load({
    google: {
      families: [
        'Nunito:regular,bold',
        'Lato:regular,bold,italic',
        'Pacifico:cursive',
      ],
    },
  });
  render(<App />, document.getElementById('root'));  // eslint-disable-line
});
