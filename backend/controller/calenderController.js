const eventm = require("../models/calenderModels");
const multer = require("multer");
// console.log(eventm);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("userimage");

const eventadd = async (req, res) => {
  try {
    await eventm.create(req.body);
    // res.send({ msg: "event added" });
    // console.log(req.body);
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    // console.log(req.body);
    // console.log(req.file);
    res.send({ msg: "file uplodaed" });

    // Everything went fine.
  });
};

const eventget = async (req, res) => {
  //   console.log("TEST");
  //   console.log(userm);

  //   userm.find({}, function (err, docs) {
  //     // docs.forEach
  //     if (!err) res.send({ msg: docs });
  //   });

  try {
    var ans = await eventm.find({});
    res.send(ans);
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

module.exports = {
  eventadd,
  eventget,
};
