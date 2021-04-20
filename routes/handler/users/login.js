const bcrypt = require('bcryptjs');
const Validator = require('fastest-validator');
const v = new Validator();
const {User} = require('../../../models');

module.exports = async (req, res) => {
    // buat validasi
    const schema = {
        email: 'email|empty:false',
        password: 'string|empty:false|min:6'
    }

    // cek validasi
    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    // cek user login
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    // cek validasi password / compare password
    const isValidPassword = await bcrypt.compare(req.body.password, user.password); 
    if(!isValidPassword) {
        return res.status(404).json({
            status: 'error',
            message: 'invalid password'
        })
    }

    return res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            vatar: user.avatar,
            profession: user.profession
        }
    });
    
}