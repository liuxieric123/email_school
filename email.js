var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host:'smtp.163.com',
    secureConnection:true,
    port:465,
    auth: {
        user: 'liuxieric123@163.com',
        pass: 'liu962888'
    }
});

var mailOptions = {
    from: 'liuxieric123@163.com', // sender address
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