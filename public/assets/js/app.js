var config = {
    apiKey: "",
    authDomain: "bucket-besties-51cb3.firebaseapp.com",
    databaseURL: "https://bucket-besties-51cb3.firebaseio.com/",
    storageBucket: "bucket-besties-51cb3.appspot.com",
    projectId: "bucket-besties-51cb3"
  }
  
  firebase.initializeApp(config)
  var database = firebase.database()
  var db = firebase.firestore()
  var auth = firebase.auth()
  
  function convertLocation(location) {
    location = addPlus(location)
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyAidckZDfScayrad0X24a9nUStcfP_OvHc"
  }