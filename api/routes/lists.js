const router = require("express").Router();
const List = require("../models/List");
const verify = require("../middleware/verifyToken");

//create list

router.post("/create", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const listMovie = new List(req.body);
    try {
      await listMovie.save();
      const createList = await List.find();
      res.status(201).json(createList);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

//update list

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const updatedList = await List.find();
      res.status(200).json(updatedList);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

//delete list

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      const deletedList = await List.find();
      res.status(201).json(deletedList);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(201).json(list);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

//get list

router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $match: { type: typeQuery, genre: genreQuery } },
          { $sample: { size: 10 } },
        ]);
      } else {
        list = await List.aggregate([
          { $match: { type: typeQuery } },
          { $sample: { size: 10 } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
