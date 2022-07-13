const url = require("url");
const logPath = ('../views/layouts/log.ejs')

exports.sign_out = (req, res) => {
    const session = req.session;

    session.destroy(function(err) {
        res.render('/',{

        })
    });
}
