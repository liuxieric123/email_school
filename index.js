var request = require('request');
var cheerio = require('cheerio');
var nodeEmail = require('nodemailer');
var sendWeChat = require('./testWechat.js')
var content = "";
var index;
var requestTimes = 0;

var checkOut = function(){
	request({url:'http://www.cugb.edu.cn/index.action',encoding:null},function(error,response,body){
		var data;
		$ = cheerio.load(body);	
		if (content == ""){
			content = $(".sec-3 .right").eq(0);
		}
		index = undefined;
		for (var i = 0;i <= 4; i++){
			data = $(".sec-3 .right").eq(i)
			if (content.text() == data.text()){
				index = i;
				content = $(".sec-3 .right").eq(0)
				break;
			}
			else if(i == 4){
				index = 5; 
				content = $(".sec-3 .right").eq(0)
			}
		}
		for (var i = 0; i <= index-1; i++){
			var meetingUrl = $(".sec-3 .list a").eq(i).attr("href");
			request({url:meetingUrl,encoding:null},function(error,response,body){  //循环中由于异步，导致内容没有来得及注入就执行了后面的代码
				var temp,
					meetingContent = '';							//在回调函数中判断循环的次数，function就是回调
				$ = cheerio.load(body);
				temp = $('.content p');
				for (var j = 0; j <= temp.length; j++){
					meetingContent = meetingContent + temp.eq(j).text() + '\n';
				}
				// if (temp.search("地球物理") !== -1 ||
				// 	temp.search("反演") !== -1 ||
				// 	temp.search("电法") !== -1 ||
				// 	temp.search("重磁") !== -1){
				// sendWeChat(temp);
				sendWeChat(meetingContent);
				// if (requestTimes == (index - 1)){
				// 	//sendMyEmail(meetingContent)
				// 	requestTimes = 0; 	
				// }
				// else{
				// 	requestTimes++;
				// 	//console.log(meetingContent)
				// 	// }
				// }
				})
			// }
		}
	})
}
		
// *********这个部分是发邮件***********
// var sendMyEmail = function(meetingContent){
// 	console.log(meetingContent)
// 	if (meetingContent.length !== 0){ //如果有更新内容就发送邮件
// 		var transporter = nodeEmail.createTransport({
// 		    host:'smtp.163.com',
// 		    secureConnection:true,
// 		    port:465,
// 		    auth: {
// 		        user: '****',
// 		        pass: '***'
// 		    }
// 		});

// 		var mailOptions = {
// 		    from: '***', // sender address
// 		    to: '47882220@qq.com', // list of receivers
// 		    subject: '学术会议通知', // Subject line
// 		    text: meetingContent, // plaintext body
// 		    // html: '<b>Hello world ✔</b>' // html body
// 		};

// 		transporter.sendMail(mailOptions, function(error, info){
// 		    if(error){
// 		        console.log(error);
// 		    }else{
// 		        console.log('Message sent: ' + info.response);
// 		    }
// 		}); 

// 		meetingContent = "";
// 	}

// // request({url:meetingUrl,encoding:"utf-8"},function(erro,response,body){ //测试取到某条会议的内容
// // 	$ = cheerio.load(body);
// // 	// console.log(body);
// // 	console.log($('.content').text().match(/"地球物理"/"重力"/"磁法"/"反演"))
// // })

// 	console.log("checked!")
// }


setInterval(checkOut,7200000); //三个小时爬一次网页