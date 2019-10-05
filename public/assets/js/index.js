// CONVERT zip code to lat and long //
function convertLocation(location) {
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyAidckZDfScayrad0X24a9nUStcfP_OvHc"
    var location = {zipcode}


    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var lat = response.results[0].geometry.location.lat
        var lng = response.results[0].geometry.location.lng
        var coord = new google.maps.LatLng(lat, lng)

        database.ref().push({
          lat: lat,
          lng: lng,
          address: location
        })
    })


// ADD Bucket List Item //    
$(".add-item").on("submit", function addBucketItem () {
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
};

// DELETE Bucket List Item //    
$(".delete-item").on("click", function(event) {
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/###" + id, {
    type: "DELETE"
  }).then(
    function() {
      console.log("deleted item", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});


