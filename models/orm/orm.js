const connection = require("../../config/db_config")

const orm = {
    selectTopTen: (cb) => {
        let statement = "SELECT a.activityDescription, count(activityID) as 'count' FROM bridge as b left join activities as a on b.activityID = a.ID GROUP BY activityID ORDER BY 2 DESC, 1 ASC LIMIT 10"
        connection.query(statement, (err, data) => {
            if (err) throw err
            console.log(data)
            cb(data)
        })
    },
    selectAUsersItems: (id, isComplete, cb) => {
        let statement = "select activityID, a.activityDescription, b.completeByDate from bridge as b left join activities as a on a.id = b.activityID where b.userID = " + id + " and completed = " + isComplete + " order by completeByDate"
        connection.query(statement, (err, data) => {
            if (err) throw err
            console.log(data)
            cb(data)        
        })
    },
    insertIntoBridgeTable: (userID, activityID, completeBy, cb) => {
        let statement = "INSERT INTO bridge (userID, activityID, completeByDate) VALUES (?,?,?)"
        connection.query(statement, [userID, activityID, completeBy], (err, data) => {
            if (err) throw err
            console.log(data)
            cb(data)
        })
    }
}

module.exports = orm