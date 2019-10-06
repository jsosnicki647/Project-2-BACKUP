var config = {
  apiKey: "AIzaSyDxCQp7aTXoAlRb2nhW6lZLEEN0ZfAmo0w",
  authDomain: "bucket-besties-51cb3.firebaseapp.com",
  databaseURL: "https://bucket-besties-51cb3.firebaseio.com/",
  storageBucket: "bucket-besties-51cb3.appspot.com",
  projectId: "bucket-besties-51cb3"
}

firebase.initializeApp(config)
var database = firebase.database()
var db = firebase.firestore()
var auth = firebase.auth()
var firebaseUser = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function (firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser)
  } else {
    console.log('not logged in')
  }
});


<<<<<<< HEAD
function convertLocation(location) {
  location = addPlus(location)
  var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDxCQp7aTXoAlRb2nhW6lZLEEN0ZfAmo0w"
}
//Get elements for login
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const submitLogin = document.getElementById("submitLogin");
=======
>>>>>>> 35114a1fac0586e7519e0e490e06578d29b619f6

// Get elements for Sign Up
const textFirstName = document.getElementById("textFirstName");
const textLastName= document.getElementById("textLastName");
const emailSignUp = document.getElementById("emailSignUp");
const passwordSignUp = document.getElementById("passwordSignUp");
const sumbitSignUp =document.getElementById("submitSignUp");

//////////// Log In/Sign Up Page ////////////////////////

<<<<<<< HEAD
// Create User
sumbitSignUp.addEventListener('click', e=>{
const firstname = textFirstName.value;
const lastname = textLastName.value;
const email = emailSignUp.value;
const password = passwordSignUp.value;
firebase.auth().createUserWithEmailAndPassword(Email, password, firstname,lastname).catch(function (error) {
=======
// Log in Existing User
firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
>>>>>>> 35114a1fac0586e7519e0e490e06578d29b619f6
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
})
});

<<<<<<< HEAD
// Log in Existing User
submitLogin.addEventListener('click',e =>{
  //Get email and password
  const email =emailLogin.value;
  const password= passwordLogin.value;
firebase.auth().signInWithEmailAndPassword(Email, password).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  //...
=======
// Create User
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});


firebase.auth().onAuthStateChanged(function (firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser)
  } else {
    console.log('not logged in')
  }
>>>>>>> 35114a1fac0586e7519e0e490e06578d29b619f6
})
});

function register(){
  email= $(".Email").val()
  password= $(".Password").val()
}
