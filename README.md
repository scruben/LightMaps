#Lightmap

##Intro
It is a small example of use of react native with redux to create a map app for Android with Mapbox. 

###Prerequisites

For the server:

- node.js
- PostgreSQL running on port 5432 with user and password set on server/config.json -- database is named "lmaps"

For the app:

- Android device (connected to the development machine) or emulator with v6.0+
- Mapbox token and backend endpoint set on app/config.json

###Usage

For server:

    npm install
    node server/main.js

If nodemon is installed:

    npm install
    npm start

By default runs on http://localhost:3000

For the app:

    npm install
    npm start
    react-native run-android
 
To run without the connection to the development machine is needed to sign the app [Signing an APK](http://facebook.github.io/react-native/releases/0.39/docs/signed-apk-android.html#generating-signed-apk) and run:

    react-native run-android --variant=release
