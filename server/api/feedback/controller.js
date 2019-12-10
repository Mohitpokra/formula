const nodemailer = require('nodemailer');
const {
  transporter,
  feedbackTemplate
} = require('../../../config/email');
const {
  validFeebackPost
} = require('../../validation/feedback/post');


module.exports.sendMail = function (req, resp, next) {

  let {
    errors,
    isValid
  } = validFeebackPost(req.body);
  if (!isValid) {
    return resp.status(400).json(errors);
  }

  const mailOptions = {
    to: 'pokra.mohit@live.com', // list of receivers
    subject: 'Formula feedback', // Subject line
    html: feedbackTemplate(req.body.feedback, req.body.name, req.body.phone, req.body.rating) // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      return resp.status(500).json({
        msg: "Internal server error"
      });
    else
      return resp.json({
        msg: "Success"
      });
  });

}
