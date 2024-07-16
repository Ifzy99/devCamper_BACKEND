const asyncHandler = require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");


// @desc   Register
// @route  GET /api/v1/auth/register
//access   Public
exports.register= asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });

    //Create token
    const token = user.getSignedJwtToken();

    res
      .status(200)
      .json({success:true, token});
});
