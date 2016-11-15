function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyBkpMprscaor1-pR8n8MkAJxM4AXlt0ZAs",
        authDomain: "comp3111-group-project.firebaseapp.com",
        databaseURL: "https://comp3111-group-project.firebaseio.com",
        storageBucket: "comp3111-group-project.appspot.com",
        messagingSenderId: "857402819132"
    };
    firebase.initializeApp(config);
}

function retrieveOnceFirebase(firebase, refPath, callbackFunc) {
    firebase.database().ref(refPath).once("value").then(callbackFunc);
}

