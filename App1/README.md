# Working with Storage

    ionic cordova plugin add cordova-plugin-nativestorage
    yarn add @ionic-native/native-storage --save

    ionic cordova plugin add cordova-sqlite-storage
    yarn add @ionic-native/sqlite --save

    ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter
    yarn add @ionic-native/sqlite-porter

    yarn add @ionic/storage --save
    yarn add @ionic/camera --save

    npx ng g service services/database

    npx ng g page pages/add
    npx ng g page pages/edit

## Running in Capacitor

    yarn add --save @capacitor/core @capacitor/cli

    npm run build

    npx cap add ios
    npx cap copy
    npx cap copy ios
    npx cap open ios
