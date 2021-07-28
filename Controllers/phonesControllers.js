const Phone = require('../Schemas/Phone')
const config = require('../Config/config');
const { cloudinary } = require('../Utils/cloudinary')
const jwt = require('jsonwebtoken');

const getAll = async (req, res) => {
    const phones = await Phone.find().sort({ createdAt: -1 }).lean();
    return phones;
}
const getOne = async (id) => {
    const phone = await Phone.findById(id);
    return phone;
}

const create = async (req, res,) => {
    const token = req.headers.authorization;
    const data = req.body.phone;
    const fileStr = req.body.image;
    let img = '';
    if (!token) {
        console.log('doest have token');
        return;
    };

    try {

        if (fileStr) {
            let file = fileStr;
            const uploadResponse = await cloudinary.uploader.upload(file, {
                upload_preset: "phones"
            });
            img = uploadResponse.public_id;
        };
        const key = jwt.verify(token, config.privateKey);
        const phone = new Phone({ ...data, image: img });
        phone.save();

        res.status(200).send(phone)
    } catch (err) {
        console.log(err);
    }
}

//Delete Phone
const deletePhone = async (req, res) => {
    const token = req.headers.authorization;
    let id = req.body.id
    if (!token) {
        console.log('doest have token');
        return;
    }
    try {
        const key = jwt.verify(token, config.privateKey);
        await Phone.findByIdAndDelete(id);

        return 'success';

    } catch (err) {
        console.log('delete', err);
        return;
    }
};
const updatePhone = async (req, res) => {
    const token = req.headers.authorization;
    const id = req.body.phone._id;
    const data = req.body.phone;
    const fileStr = req.body.image;
    let phone = '';
    let img = ''
    if (!token) {
        console.log('doest have token');
        return;
    }
    try {
        if (fileStr) {
            let file = fileStr;
            const uploadResponse = await cloudinary.uploader.upload(file, {
                upload_preset: "phones"
            });
            img = uploadResponse.public_id;
        };
        if (data) {
            phone = await Phone.findByIdAndUpdate({ _id: id }, { "$set": { ...data, image: (img || data.profilephoto) } });
        }
        return phone;

    } catch (err) {
        console.log('delete', err);
        return;
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    deletePhone,
    updatePhone
};