const {User, RefreshToken} = require('../../../models');

module.exports = async (req, res) => {
    const refreshToken = req.query.refresh_token;

    const token = await RefreshToken.findOne({
        where: {
            token: refreshToken
        },
        attributes: ['token']
    })

    if(!token) {
        return res.status(404).json({
            status: 'error',
            message: 'invalid token'
        })
    }

    return res.json({
        status: 'success',
        token: token
    })
}