module.exports = function(content){
	var api = require("wechat-enterprise-api");
	var corpid = "**",
		secret = "**",
		agentid = 1;
	var handle = new api(corpid, secret, agentid);

	var to = {
		"touser": "liuxieric123",
		"toparty": "liuxieric123",
		"totag": "liuxieric123"
	};
	var msg = {
		"msgtype": "text",
		"text": {
			"content": content
		},
		"safe": "0"
	}
	handle.send(to, msg, function(err, result){
		// console.log(result)
	})

	// console.log(handle);
}