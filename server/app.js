var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("certs/lab-firebase-aefba-firebase-adminsdk-0n4ed-ff41738641.json"),
  databaseURL: "https://lab-firebase-aefba.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

// Teams
var teams_ref = db.ref("teams");
teams_ref.on("value", function(snapshot) {
  console.log(snapshot.val());
});

// Events
var events_ref = db.ref("events");
events_ref.on("value", function(snapshot) {
  console.log(snapshot.val());
});

/* Instead of doing console.log to display the entire database, it can do notification, send email!  */
