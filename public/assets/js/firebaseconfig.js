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




//////////// Log In/Sign In Page ////////////////////////

// Log in Existing User
firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

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
})

function register(){
  email= $(".Email").val()
  password= $(".Password").val()
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Register
$('#registerForm').on('submit', function (e) {
  e.preventDefault();
      $('#registerModal').modal('hide');
    
      $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
      $('#messageModal').modal('show');
      var data = {
        email: $('#registerEmail').val(), //get the email from Form
        firstName: $('#registerFirstName').val(), // get firstName
        lastName: $('#registerLastName').val(), // get lastName
      };
      var passwords = {
        password : $('#registerPassword').val(), //get the pass from Form
        cPassword : $('#registerConfirmPassword').val(), //get the confirmPass from Form
      }
      if( data.email != '' && passwords.password != ''  && passwords.cPassword != '' ){
        if( passwords.password == passwords.cPassword ){
          //create the user
          
          firebase.auth()
            .createUserWithEmailAndPassword(data.email, passwords.password)
            .then(function(user) {
              return user.updateProfile({
                displayName: data.firstName + ' ' + data.lastName
              })
            })
            .then(function(user){
              //now user is needed to be logged in to save data
              auth = user;
              //now saving the profile data
              usersRef.child(user.uid).set(data)
                .then(function(){
                  console.log("User Information Saved:", user.uid);
                })
              $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
              
              $('#messageModal').modal('hide');
            })
            .catch(function(error){
              console.log("Error creating user:", error);
              $('#messageModalLabel').html(spanText('ok'))
            });
        } else {
          //password and confirm password didn't match
          $('#messageModalLabel').html(spanText("ERROR: Passwords didn't match", ['danger']))
        }
      }  
    });
  
    //Login
    $('#loginForm').on('submit', function (e) {
      e.preventDefault();
      $('#loginModal').modal('hide');
  
      $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
      $('#messageModal').modal('show');
  
      if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
        //login the user
        var data = {
          email: $('#loginEmail').val(),
          password: $('#loginPassword').val()
        };
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
          .then(function(authData) {
            auth = authData;
            $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
            $('#messageModal').modal('hide');
          }) .then(function() {  window.location.href = "firstPage.html";})
          .catch(function(error) {
            console.log("Login Failed!", error);
            $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
          });
      }
    });
  //logout
    $('#logout').on('click', function(e) {
      e.preventDefault();
      firebase.auth().signOut()
      window.location.href = "index.html";
    });
  
   
  