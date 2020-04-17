<img src="doc/landing.png">

## Installation

The dependencies of this application are as follows:
   * [Meteor](https://www.meteor.com/install)
   * [npm]()

After installing the dependencies, run the following in the /app directory:
```
$ meteor npm install
```

## Running the system

To run the app, in the /app directory, run:
```
$ meteor npm run start
```

To view your application, go to [https://localhost:3000](https://localhost:3000).

### Application functionality

The application allows the user to store contact information, saving others' names, images, description, address, and notes for each contact.

There is a superuser known as admin that is able to view all contacts stored in the app.

#### Landing page

On the landing page, the functionalities/benefits of the application are displayed. The user is then able to sign in or register for a new account.

#### Login page

In the login page, the user can sign into their account to view their contacts and add contacts.

#### Register page

In the register page, users are able to create a new account for the website.

#### Landing (after Login) page, non-Admin user

Upon login, the user is able add contacts or view their current contacts.

#### Add Places page

In this page, users are able to add new contacts to their account.

#### List Places page

The user can edit current contacts or add notes to their contacts.

#### Edit Stuff page

Upon clicking the 'Edit' button on their current contacts, users can change the information of that contact.

#### Landing (after Login), Admin user

Logging in as an admin user, the admin has the same functionalities as a regular user, but also has access to a special page, "Admin."

#### Admin page (list all users contacts)

This page lists all of the contacts of all the users.
