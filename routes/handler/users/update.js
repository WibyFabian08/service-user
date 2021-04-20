const bcrypt = require('bcryptjs');
const Validator = require('fastest-validator');
const v = new Validator();
const {User} = require('../../../models');

module.exports = async (req, res) => {
    // buat validasi
    const schema = {
        name: 'string|optional',
        email: 'email|optional',
        password: 'string|min:6|optional',
        profession: 'string|optional',
        avatar: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if(validate.length) {
        return res.status(409).json({
            status: 'error',
            message: validate
        })
    }

    // get user by primary key
    const id = req.params.id;
    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    const email = req.body.email;

    if(email) {
        const checkEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if(checkEmail && email !== user.email) {
            return res.status(409).json({
                status: 'error',
                message: 'email already exist'
            })
        }
    }

    let password = req.body.password;

    if(req.body.password) {
        password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update({
        name: req.body.name,
        email: req.body.email,
        password: password,
        profession: req.body.profession,
        avatar: req.body.avatar  
    })


    return res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            profession: user.profession,
            avatar: user.avatar 
        }
    })
}