const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

// Monter le middleware bodyParser.urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware de journalisation au niveau racine
app.use(function middleware(req, res, next) {
  const { method, path, ip } = req;
  console.log(`${method} ${path} - ${ip}`);
  next();
});

// Route pour servir index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Middleware pour servir des fichiers statiques
app.use("/public", express.static(__dirname + "/public"));

// Route JSON
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

// Route API
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

app.get("/name", (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;

  if (!firstName || !lastName) {
    res
      .status(400)
      .json({ error: "Please provide both first and last name parameters." });
    return;
  }

  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});
app.post("/name", function (req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

//MongoDB
require("dotenv").config();

//Install & Set Up Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection etabli"))
  .catch((err) => console.log(err));

//Person Model
var personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create the model
let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let David = new Person({
    name: "David",
    age: 36,
    favoriteFoods: ["hamburger"],
  });

  David.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      done(null, data);
    }
  });
};

//const createAndSavePerson = (done) => {
//done(null /*, data*/);
//};

let arrayOfPeople = [
  { name: "Rachel", age: 30, favoriteFoods: ["Del Taco"] },
  { name: "Elda", age: 28, favoriteFoods: ["roast chicken"] },
  { name: "Guy", age: 41, favoriteFoods: ["wine"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};
//const createManyPeople = (arrayOfPeople, done) => {
//done(null /*, data*/);
//};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
//const findPeopleByName = (personName, done) => {
//done(null /*, data*/);
//};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
//const findOneByFood = (food, done) => {
//done(null /*, data*/);
//};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
//const findPersonById = (personId, done) => {
//done(null /*, data*/);
//};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};
//const findEditThenSave = (personId, done) => {
//const foodToAdd = "hamburger";
//done(null /*, data*/);
//};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};
//const findAndUpdate = (personName, done) => {
//const ageToSet = 20;
//done(null /*, data*/);
//};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};
//const removeById = (personId, done) => {
//done(null /*, data*/);
//};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, removePeople) => {
    if (err) return console.log(err);
    done(null, removePeople);
  });
};
//const removeManyPeople = (done) => {
//const nameToRemove = "Mary";
//done(null /*, data*/);
//};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};
//const queryChain = (done) => {
//const foodToSearch = "burrito";
//done(null /*, data*/);
//};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
