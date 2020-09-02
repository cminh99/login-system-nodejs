# passport-authenticate-nodejs

Simple nodejs application that allows users to log in and sign up through their Google and Facebook accounts. This application uses the modules `passport-local`, ` passport-facebook`, `passport-google-oauth20` to authenticate the user.

### Usage

#### Create an Application

You must register an application with **Google** and **Facebook**. If you have not already done so, a new project can be created in the [Google Developers Console](https://console.developers.google.com/) and [Facebook For Developers](https://developers.facebook.com/). Your application will be issued a `CLIENT_ID/APP_ID` and `CLIENT_SECRET/APP_SECRET`, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

#### Configuration

The application uses environment variables to configure the `CLIENT_ID/APP_ID` and `CLIENT_SECRET/APP_SECRET` variables.

```
CLIENT_ID=your.google.client_id
CLIENT_SECRET=your.google.client_secret

APP_ID=your.facebook.app_id
APP_SECRET=your.facebook.app_secret
```

#### Run the application

Clone the repository and install dependencies.

```
$ git clone https://github.com/nhcminh303/passport-authenticate-nodejs.git
$ cd passport-authenticate-nodejs.git
$ npm install
$ npm start

# or run with nodemon
$ npm run dev
```

Go to http://localhost:3000 on your browser to see the application in action.
