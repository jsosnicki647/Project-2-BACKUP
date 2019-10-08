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

      $.ajax("/api/adduser", {
          type: "POST",
          data: newUser
        })
        .then((data) => console.log(data))

    })
}

$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var newItemInput = $(".itemTable");
  // Our new todos will go inside the todoContainer
  var bucketContainer = $(".bucketContainer");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteTodo);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".todo-item", editTodo);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", insertTodo);

  // Our initial items array
  var items = [];

  // Getting items from database when page loads
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
    $.get("/api/useritems", function(data) {
      items = data;
      initializeRows();
    });
  }



// ADD Bucket List Item //    
$(".add-item").on("submit", function addBucketItem(event) {
  event.preventDefault();

  var newItem = {
    userid: 1, //need to get logged in user's id
    item: $(".inputBucketItem").val().trim(),
    type: $(".selectBucketType").val().trim(),
    deadline: $(".inputDeadline").val().trim()
  };
  // Send the POST request.
  $.ajax("/api/newitem", {
    method: "POST",
    data: newItem
  }).then(
    function () {
      console.log("created new bucket list item");
      // Reload the page to get the updated list
      location.reload();
    }
  );
});


// DELETE Bucket List Item //    
$("#delete-item").on("click", function deleteBucketItem (event) {
  event.stopPropagation();
  var id = $(this).data("id");
  // Send the DELETE request.
  $.ajax("/api/useritems" + id, {
    method: "DELETE"
  }).then(
    function () {
      console.log("deleted item", id);
      // Reload the page to get the updated list
      location.reload();
    }
  );
});

// COMPLETE Bucket List Item //
$("#complete-item").on("click", function completeItem(event) {
  event.stopPropagation();
  var id = $(this).data("id");

  // Send the PUT request.
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

// DISPLAY User Info //
function getUserInfo() {
$.ajax("/api/user", {
    type: "GET"
  })
  .then((response) => {

  })
}


// Display User's Bucket List
$.ajax("api/useritems", {
  type: "GET"
})
.then()
}

// DISPLAY Top 10 Trending Items //
$.ajax("api/top", {
    type: "GET"
  })
  .then()
}


// Display User's Bucket List
$.ajax("api/useritems", {
  type: "GET"
})
.then()
}

// DISPLAY Top 10 Trending Items //
$.ajax("api/top", {
    type: "GET"
  })
  .then()
}

// DISPLAY Nearby Users with similar bucket list items //
$.ajax("api/nearbyusers", {
  type: "GET"
})
.then()
}
<<<<<<< HEAD
=======


// DISPLAY Nearby Users with similar bucket list items //
$.ajax("api/nearbyusers", {
  type: "GET"
})
.then()
}


>>>>>>> 31dee1f7725e0ea3f650eac29ebd604f5048058e
