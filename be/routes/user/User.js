const express = require("express");
const router = express.Router();
const ModelUser = require("../../model/user/User");
const bcrypt = require("bcrypt");
//Post Method
router.post("/post", async (req, res) => {
  const data = new ModelUser({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
  res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const data2 = new ModelUser({
    name: req.body.name,
    password: passwordHash,
    email: req.body.email,
    address: req.body.address || "",
    role: "Normal",
    urlImg: req.body.url || "",
  });
  console.log(data2);
  // try {
  //     const dataToSave = await data2.save();
  //     res.send(JSON.stringify({"status": 200, "error": null, "response": "hello"}));
  // }
  // catch (error) {
  //     res.status(400).json({message: error.message})
  // }
  const checkName = await ModelUser.findOne({ name: data2.name });
  const checkEmail = await ModelUser.findOne({ email: data2.email });
  if (checkName) {
    try {
      res.send(
        JSON.stringify({
          status: 401,
          error: null,
          response: "tai khoan hoac email ton tai",
        })
      );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (checkEmail) {
    try {
      res.send(
        JSON.stringify({ status: 402, error: null, response: " email ton tai" })
      );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const dataToSave = await data2.save();
      res.send(JSON.stringify({ status: 200, error: null, response: "hello" }));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const data = await ModelUser.findOne({ name: req.body.name });

  console.log(data);

  if (data) {
    const match = await bcrypt.compare(req.body.password, data.password);

    if (match) {
      try {
        res.send(
          JSON.stringify({
            status: 200,
            id: data._id,
            error: null,
            response: "SuccessLogin",
          })
        );
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.send(
        JSON.stringify({
          status: 400,
          error: null,
          response: "tai hoac mat khau sai",
        })
      );
    }
  } else {
    res.send(
      JSON.stringify({
        status: 400,
        error: null,
        response: "tai hoac mat khau sai",
      })
    );
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const data = await ModelUser.findById({ _id: user }, { password: 0 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
