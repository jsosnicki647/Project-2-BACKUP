const db = require("../models");
const orm = require("../models/orm/orm")

module.exports = function (app) {
  //get top 10 bucket list items
  app.get("/api/top", (req, res) => orm.selectTopTen((data) => res.json(data)))
  
  //get a specific user's item list
  app.get("/api/useritems", (req, res) => orm.selectAUsersItems(req.body.userID, req.body.isComplete, (data) => res.json(data)))

  //get data for a specific user
  app.get("/api/user", (req, res) => orm.selectUser(req.body.userID, (data) => res.json(data)))

  //find nearby users with one of your bucket list items
  app.get("/api/nearbyusers", (req, res) => orm.nearbyUsersWithSameInterests(req.body.userID, req.body.activityID, (data) => res.json(data))) 

  // add new user
  app.post("/api/adduser", (req, res) => {
    db.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        zip: req.body.zip,
        lat: req.body.lat,
        lon: req.body.lon
        // surveyQ1: req.body.surveyQ1,
        // surveyQ2: req.body.surveyQ2,
        // surveyQ3: req.body.surveyQ3,
        // surveyQ4: req.body.surveyQ4,
        // surveyQ5: req.body.surveyQ5
      })
      .then((data) => res.json(data))
  })

  // add new item to bucket list
  app.post("/api/newitem", (req, res) => {
    db.Activities.findAll({
        where: {
          activityDescription: req.body.item
        }
      })
      .then((data1) => {
        //add new item to activities table if not already present
        if (data1.length == 0) {
          db.Activities.create({
              activityDescription: req.body.item,
              category: req.body.type
            })
            .then(() => {
              db.Activities.findAll({
                  where: {
                    activityDescription: req.body.item
                  }
                })
                .then((data2) => {
                  newActivityID = data2[0].id
                  orm.insertIntoBridgeTable (req.body.userid, newActivityID, req.body.deadline, (data) => res.json(data))
                })
            })
        }
        else {
          activityID = data1[0].id
          orm.insertIntoBridgeTable (req.body.userid, activityID, req.body.deadline, (data) => res.json(data))
        }
      })
  })
  
  // mark activity as complete
  app.put("/api/complete/", (req, res) => {
    console.log(req.body);
    db.Bridge.update({
        completed: 1
      }, {
        where: {
          userID: req.body.userID,
          activityID: req.body.activityID
        }
      })
      .then((data) => {
        console.log(data);
        res.json(data)
      })
  })
}