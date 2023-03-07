const jwt = require("jsonwebtoken");
const bcrpt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

//@des register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("please fill all the fields");
    }

    //check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("user already exists");
    }

    //hash password
    const salt = await bcrpt.genSalt(10);
    const hashedPassword = await bcrpt.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("invalid user data");
    }
});

//@des authenticate a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrpt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("invalid credentials");
    }
});

//@des get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    });
});

//generate jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETE, { expiresIn: "3d" });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
