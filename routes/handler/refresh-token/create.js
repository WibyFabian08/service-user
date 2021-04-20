const {RefreshToken, User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const refresh_token = req.body.refresh_token;

    const schema = {
        user_id: 'number',
        refresh_token: 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(409).json({
            status: 'error',
            message: validate
        })
    }

    const user = await User.findByPk(userId);

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    const tokenCreated = await RefreshToken.create({
        user_id: userId,
        token: refresh_token
    });

    return res.json({
        status: 'success',
        data: {
            id: tokenCreated.id
        }
    })
}