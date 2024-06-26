const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async")
const geocoder =require("../utils/geocoder")
const ErrorResponse = require("../utils/errorResponse");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
//access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();

    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc Get sigle bootcamps
// @route GET /api/v1/bootcamps/:id
//access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
});

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps/:id
//access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
});

// @desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
//access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
});

// @desc Delete bootcamps
// @route DELETE /api/v1/bootcamps/:id
//access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: {}, msg: "Bootcamp Deleted" });
});



// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
//access  Private
exports.getBootcampsInRaduis = asyncHandler(async (req, res, next) => {
  const {zipcode, distance} = req.params;

   //Get lat/lng from geocoder
   const loc = await geocoder.geocode(zipcode);
   const lat = loc[0].latitude;
   const lng = loc[0].longitude;

   //cal radius using radians
   //Divide dist by radius of Earth
   //Earth Raduis = 3,963 mi / 6,378km
   const radius = distance / 3963; //distance in miles

  const bootcamps = await Bootcamp.find({location: {$geoWithin: {$centerSphere: [[lng, lat], radius]}}}); //find all bootcamps within the radius

  res.status(200).json({
     success: true,
     count: bootcamps.length,
     data:bootcamps
    });
});

