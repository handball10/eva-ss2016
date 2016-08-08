/**
 * Created by flori on 08.08.2016.
 */

var config = {
    apiKey: "AIzaSyD5n8G5I9feSfmW9gr59YwhDsG93Z5m4fM",
    authDomain: "eva-ss2016.firebaseapp.com",
    databaseURL: "https://eva-ss2016.firebaseio.com",
    storageBucket: "eva-ss2016.appspot.com",
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();