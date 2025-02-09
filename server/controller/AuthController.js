const UserModel = require("../models/UserModel");
const generateToken = require("../utils/JWT");
const Logger = require("../utils/Logger");
const log = new Logger();

const SaveUserData = async (req, res) => {
    const { username, email, isVerified, avatarURL } = req.body;

    try {
        if (!username || !email || !isVerified)
            return res.json({
                success: false,
                message: "Unable to save user data, All fields must be provided"
            })

        //check for existing user
        const User = await UserModel.findOne({
            email: email
        })

        if (!User) {
            //create user
            const CurrentUser = new UserModel({
                username, email, isVerified, avatarURL
            })
            //create jwt token
            const token = generateToken({
                id : CurrentUser._id,
                username : CurrentUser.username,
                email : CurrentUser.email,
                isVerified : CurrentUser.isVerified,

            });
            //save the user
            await CurrentUser.save();
            return res.json({
                success: true,
                message: "User data saved to Database Successfully",
                token : token
            })
        }

        //create jwt token
        const token = generateToken({
            id : User._id,
            username : User.username,
            email : User.email,
            isVerified : User.isVerified,

        });
        return res.json({
            success: true,
            message: "User already exists",
            token : token
        })
    }
    catch (error) {
        log.error(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {SaveUserData}