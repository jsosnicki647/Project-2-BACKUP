

// ADD Bucket List Item //    
$(".add-item").on("submit", function addBucketItem (event) {
    event.preventDefault();

    var newItem = {
      userid: 1, //need to get logged in user's id
      item: $(".inputBucketItem").val().trim(),
      type: $(".selectBucketType").val().trim(),
      deadline: $(".inputDeadline").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/newitem", {
      type: "POST",
      data: newItem
    }).then(
      function() {
        console.log("created new cabucket lilst itemt");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


//add new user
$(".sign-up").on("submit"), () => {
  let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $(".zip-code").val().trim() + "&key=AIzaSyAidckZDfScayrad0X24a9nUStcfP_OvHc"

  let lat, lon
  
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then((response) => {
      lat = response.results[0].geometry.location.lat
      lon = response.results[0].geometry.location.lon

      let newUser = {
        firstName: $(".first-name").val().trim(),
        lastName: $(".last-name").val().trim(),
        userName: $(".username").val().trim(),
        email: $(".email-address").val().trim(),
        zip: $(".zip-code").val().trim(),
        lat: lat,
        lon: lon
      }

      $.ajax("api/adduser", {
        type: "POST",
        data: newUser
      })
      .then((data) => console.log(data))
  
  })
}
  



// DELETE Bucket List Item //    


