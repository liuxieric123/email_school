var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host:'mail.cugb.edu.cn',
    secureConnection:true,
    port:25,
    auth: {
        user: 'liuxieric@cugb.edu.cn',
        pass: '43032119910503651X'
    }
});

var mailOptions = {
    from: '2110150012@cugb.edu.cn', // sender address
    to: '47882220@qq.com', // list of receivers
    subject: '我是刘系，在测试邮件', // Subject line
    text: 'test test test', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
}); 