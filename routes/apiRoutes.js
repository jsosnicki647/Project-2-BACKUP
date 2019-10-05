const db = require("../models");
const orm = require("../models/orm/orm")

module.exports = function (app) {
  //get top 10 bucket list items
  app.get("/api/top", (req, res) => orm.selectTopTen((data) => res.json(data)))

  app.get("/api/useritems", (req, res) => orm.selectAUsersItems(req.body.userID, req.body.isComplete, (data) => res.json(data)))

  // add new user
  app.post("/api/adduser", (req, res) => {
    db.users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        lat: req.body.lat,
        lon: req.body.lon,
        surveyQ1: req.body.surveyQ1,
        surveyQ2: req.body.surveyQ2,
        surveyQ3: req.body.surveyQ3,
        surveyQ4: req.body.surveyQ4,
        surveyQ5: req.body.surveyQ5
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
                  
                  // console.log(req.body)
                  newActivityID = data2[0].id
                  // console.log(data2[0].id)
                  // date = Date.parse(req.body.deadline)
                  console.log(req.body.userid)
                  console.log(newActivityID)
                  console.log(req.body.deadline)
                  db.Bridge.create({
                    userID: req.body.userid,
                    activityID: newActivityID,
                    completeByDate: req.body.deadline
                  })
                  .then((data3) => {
                      console.log(data3)
                      res.json(data3)
                    })
                })
            })
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