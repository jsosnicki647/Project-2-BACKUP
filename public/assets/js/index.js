// ADD new user
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
        console.log("created new bucket list item");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


// DELETE Bucket List Item //    
$("#delete-item").on("click", function (event) {
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/###" + id, {
    type: "DELETE"
  }).then(
    function () {
      console.log("deleted item", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});

// COMPLETE Bucket List Item //
$("#complete-item").on("click", function (event) {
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/complete" + id, {
    type: "PUT"
  }).then(
    function () {
      console.log("completed item", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});


// DISPLAY Top Trending Items //




// 