const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `${Date.now()}: ${req.method}: ${req.path} \n`,
    (err, data) => {
      next();
    }
  );
});

// routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {})
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userToRemoveIndex = users.findIndex(user => {
      return user.id === id;
    });

    if (userToRemoveIndex === -1) {
      return res.json({
        Error: "No user found with given Id"
      });
    } else {
      users.splice(userToRemoveIndex, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({
          Status: "Success",
          user: `User with ${id} has been removed`
        });
      });
    }
  });

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));
