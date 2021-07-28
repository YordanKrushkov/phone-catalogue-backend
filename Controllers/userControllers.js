require('dotenv').config();
const User = require('../Schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Generate Token
const generateToken = (data) => {
    const token = jwt.sign(data, process.env.PRIVATE_KEY);
    return token;
};

// Register
const register = async (req, res) => {
    let { email, password } = req.body;

    if (password.length < 6) {
        return;
    };
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await new User({ email, password: hashedPass });

    newUser.save().then((data) => {
            const token = generateToken({
                userId: data._id,
                email: data.email,
            });
            console.log('data',data);
            res.header('Authorization', token).send(data)
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(400).send(err.keyValue)
            }
            return
        })
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).send();
        return;
    }
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
        console.log('Wrong username or password');
        res.status(404).header('Authorization', 'none').send();
        return;
    }
    const token = generateToken({
        userId: user._id,
        email: user.email,
    });
    if (user && token) {
        res.status(200).header('Authorization', token).send(user);
    };
};

//Verify User
const verifyUser = async (req, res) => {
    const token = await req.headers.authorization;
    if (!token) {
        return;
    };
    try {
        const key = await jwt.verify(token, process.env.PRIVATE_KEY);
        if (key) {
            const { email} = key;
            const user = await User.findOne({ email });
            if (!user) {
                console.log('Wrong username or password 2');
                return;
            }
            return user;
        }

    } catch (err) {
        console.log(err);
        return;
    };
};

module.exports = {
    register,
    login,
    verifyUser,
}