import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import WebFont from 'webfontloader';
import App from '../../ui/layouts/App.jsx';

/** Startup the application by rendering the App layout component. */
Meteor.startup(() => {
  WebFont.load({
    google: {
      families: [
        'Nunito:regular,bold',
        'Lato:regular,bold,italic',
        'Pacifico:cursive',
        'Oswald:extra-light',
      ],
    },
  });
  render(<App />, document.getElementById('root'));  // eslint-disable-line
});
