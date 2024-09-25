var nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, contentHTML) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_OTP,
            pass: process.env.PASS_OTP
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_OTP,
        to: email,
        subject: subject,
        html: contentHTML
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}