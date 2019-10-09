// ADD new user ---->>> should this block live in myscript.js??
$(".sign-up").on("submit"), () => {
  let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $("#zipcode").val().trim() + "&key=AIzaSyAidckZDfScayrad0X24a9nUStcfP_OvHc"

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
        zip: $("#zipcode").val().trim(),
        lat: lat,
        lon: lon
      }

      $.ajax("/api/adduser", {
          type: "POST",
          data: newUser
        })
        .then((data) => console.log(data))

    })
}


///////////////////////// ADD, DELETE, COMPLETE Bucket Items //////////////////////
$(document).ready(function () {
// Getting a reference to the input field where user adds a new item
var newItemInput = $(".itemTable");
// New items will go inside the bucketContainer
var bucketContainer = $(".bucketContainer");
// Adding event listeners for deleting, editing, and adding todos
$(document).on("submit", "#add-item", addBucketItem);
$(document).on("click", "#complete-item", completeItem);
$(document).on("click", "#delete-item", deleteBucketItem);

// Initial items array
var items = [];

// Getting user info and bucket items from database when page loads
getUserInfo();
getBucketItems();

// This function resets the todos displayed with new todos from the database
function initializeRows() {
  bucketContainer.empty();
  var rowsToAdd = [];
  for (var i = 0; i < items.length; i++) {
    rowsToAdd.push(createNewRow(todos[i]));
  }
  bucketContainer.prepend(rowsToAdd);
}


// GRAB Bucket Items from the database and updates the view
function getBucketItems() {
  $.get("/api/useritems", function (data) {
    items = data;
    initializeRows();
  });
};


// ADD Bucket List Item //    
function addBucketItem(event) {
  event.preventDefault();

  var newItem = {
    userid: 1, //need to get logged in user's id
    item: $(".inputBucketItem").val().trim(),
    type: $(".selectBucketType").val().trim(),
    deadline: $(".inputDeadline").val().trim()
  };
  // Send the POST request.
  $.post("/api/newitem", newItem, getBucketItems);
  newItemInput.val("");
  console.log(newItem)
};

// DELETE Bucket List Item //    
function deleteBucketItem(event) {
  event.stopPropagation();
  var id = $(this).data("id");
  // Send the DELETE request.
  $.ajax("/api/useritems" + id, {
    method: "DELETE"
  }).then(getBucketItems);
  console.log("deleted item", id);
};

// COMPLETE Bucket List Item //
function completeItem(event) {
  event.stopPropagation();
  var id = $(this).data("id");
  // Send the PUT request.
  $.ajax("/api/complete" + id, {
    type: "PUT"
  }).then(getBucketItems)
  console.log("completed item", id);
};
});

// DISPLAY User Info //
var userInfo = []
function getUserInfo() {
$.get("/api/user", function(data) {
   userInfo = data;
  });
};


//////////////////////////////////////////////////////////


// // DISPLAY Top 10 Trending Items //
// $.get("api/top", {
//   })
//   .then()
// }

// // DISPLAY Nearby Users with similar bucket list items //
// $.get("api/nearbyusers", {
// })
// .then()
