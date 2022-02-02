const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../middleware/verifyToken");
const uploadFiles = require("../config");

//create movie

router.post(
  "/create",
  verify,
  uploadFiles.fields([
    { name: "img", maxCount: 1 },
    { name: "imgsm", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    if (req.user.isAdmin) {
      const img = req.files["img"][0];
      const imgsm = req.files["imgsm"][0];
      const trailer = req.files["trailer"][0];
      const video = req.files["video"][0];
      const newMovie = new Movie({
        title: req.body.title,
        desc: req.body.desc,
        year: req.body.year,
        genre: req.body.genre,
        limit: req.body.limit,
        duration: req.body.duration,
        isSeries: req.body.isSeries,
        img: img.path,
        imgsm: imgsm.path,
        trailer: trailer.path,
        video: video.path,
      });
      try {
        await newMovie.save();
        const createMovies = await Movie.find();
        res.status(201).json(createMovies);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(403).json("you are not allowed!");
    }
  }
);

//update movie

router.put(
  "/:id",
  verify,
  uploadFiles.fields([
    { name: "imgsm", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const imgsm = req.files["imgsm"][0];
        const trailer = req.files["trailer"][0];
        const video = req.files["video"][0];

        await Movie.findByIdAndUpdate(
          req.params.id,
          {
            title: req.body.title,
            year: req.body.year,
            genre: req.body.genre,
            limit: req.body.limit,
            imgsm: imgsm.path,
            trailer: trailer.path,
            video: video.path,
          },
          { new: true }
        );
        const updatedMovies = await Movie.find();
        res.status(200).json(updatedMovies);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(403).json("you are not allowed!");
    }
  }
);

//delete movie

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      const deletedMovies = await Movie.find();
      res.status(200).json(deletedMovies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

//get movie

router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get all

router.post("/list", verify, async (req, res) => {
  try {
    const movie = await Movie.find({ _id: { $in: req.body } });
    console.log(movie);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get random movie

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      console.log(type);
      movie = await Movie.aggregate([
        {
          $match: { isSeries: true },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    } else {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: false },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get all movie

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});
module.exports = router;
