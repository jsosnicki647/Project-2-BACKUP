var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};






// nodemailer

app.post("/form", (req, res, next) => {

  var email = req.body.email;
  
  var name = req.body.name;
  
  console.log(email, name)
  
  const output =`<p> You have a new contact request </p>
      <P> 😎Thank you for joing the squad 😎</p>
      <ul>     
      <li>Name: ${req.body.name}</li>
      <li>email: ${req.body.email}</il>
      </ul>`;
  
  const nodemailer = require('nodemailer');
  
  let transporter =  nodemailer.createTransport({
      service : "gmail",
  
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });
  
  
  
  let mailoptions  = {
      from: process.env.EMAIL, // sender address
      to: `${email}`, // list of receivers
      subject: 'registration ✔', // Subject line
      text: `Hey ${name}`, // plain text body
      html: output
  };
  
  transporter.sendMail(mailoptions, (err, data) =>{
  if (err){
      console.log(err)
  }else{ console.log("email sent")}
  });
  
  
  // res.send("its okay")
  })