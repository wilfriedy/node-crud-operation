const express = require("express");
const app = express();
let { people } = require("./data");
app.use(express.json());

// making a get request
app.get("/people/names", (req, res) => {
  res.status(200).json({ people });
});

// making a post request

app.post("/people/names", (req, res) => {
  //   console.log(req.body);
  let { name } = req.body;
  let existing__person = people.find((person) => person.name === name);
  if (existing__person) {
    res.status(401).json({ success: false, msg: "this user exists alredy" });
  } else {
    res.status(200).json({
      success: true,
      reponse___: [...people, { id: people.length + 1, name }],
    });
  }
});

// updating with put  method
app.put("/people/names/:id", (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  let person__to__update = people.find((person) => person.id === +id);
  console.log(person__to__update);
  if (!person__to__update) {
    res.status(401).json({ msg: "such id does not exist" });
  } else {
    let modified__list = people.map((person) => {
      if (person.id === +id) {
        person.name = name;
      }
      return person;
    });
    res.status(200).json({ msg: "request updated", data: modified__list });
  }
});
app.listen(3000, () => console.log("running"));
