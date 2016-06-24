var request = require('request');
var cheerio = require('cheerio');
var nodeEmail = require('nodemailer');
var content;



var checkOut = function(){
	request({url:'http://www.cugb.edu.cn/index.action',encoding:null},function(error,response,body){
		var data;
		var meetingContent;
		$ = cheerio.load(body);	
		if (content == undefined)
			content = $(".sec-3 .right").eq(0);
		// var meetingUrl = $(".sec-3 .list a").eq(0).attr("href"); //测试取到标签a中的href属性
		// console.log(meetingUrl);
		for (var i = 0; i <= 4; i++){
			data = $(".sec-3 .right").eq(i)

			if (data.text() == content.text()){
				break;
			}
			else{
				var meetingUrl = $(".sec-3 .list a").eq(i).attr("href");
				request({url:meetingUrl,encoding:null},function(error,response,body){
					var temp;
					$ = cheerio.load(body);
					temp = $('.content').text();
					if (temp.search("地球物理") !== -1 ||
						temp.search("反演") !== -1 ||
						temp.search("电法") !== -1 ||
						temp.search("重磁") !== -1){
						meetingContent.concat(temp);
					}

				})
			}
		}
		if (meetingContent){ //如果有更新内容就发送邮件
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
			    subject: '学术会议通知', // Subject line
			    text: meetingContent, // plaintext body
			    // html: '<b>Hello world ✔</b>' // html body
			};

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        console.log(error);
			    }else{
			        console.log('Message sent: ' + info.response);
			    }
			}); 

			meetingContent = undefined;
		}
		// request({url:meetingUrl,encoding:"utf-8"},function(erro,response,body){ //测试取到某条会议的内容
		// 	$ = cheerio.load(body);
		// 	// console.log(body);
		// 	console.log($('.content').text().match(/"地球物理"/"重力"/"磁法"/"反演"))
		// })

		
	})
	console.log("checked!")
}

setInterval(checkOut,10800000); //三个小时爬一次网页