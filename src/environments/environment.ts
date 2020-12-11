// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDf7oBgxcSz5cImTqLSco8EikrKFFMtUWw",
    authDomain: "notea-42a99.firebaseapp.com",
    databaseURL: "https://notea-42a99.firebaseio.com",
    projectId: "notea-42a99",
    storageBucket: "notea-42a99.appspot.com",
    messagingSenderId: "261031173503",
    appId: "1:261031173503:web:7d38125a404967f39ece4a",
    measurementId: "G-6REYLWWHS9"
  },
  notasCollection:'Notas'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
