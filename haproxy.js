var request = require('request');
var fs = require('fs-extra');
//var childProcess = require('child_process');
//var sleep = require('sleep');

request('http://127.0.0.1:8080/v2/apps/node', function (error, response, body) {
	if (!error && response.statusCode == 200) {

		//fs.appendFileSync('/Users/liujia/software/haproxy/log',body);

		var json = JSON.parse(body);

		var content = '';
		for(var i = 0 ; i < json.app.tasks.length ; i++){
			var task = json.app.tasks[i];
			if(task.version === json.app.version){
				content += '    \nserver node'+i+' '+task.host+':'+task.ports[0];
			}
		}

		fs.copySync('/Users/liujia/software/haproxy/config.tmpl','/Users/liujia/software/haproxy/config');
		fs.appendFileSync('/Users/liujia/software/haproxy/config',content);
		//childProcess.execSync('haproxy -D -f /Users/liujia/software/haproxy/config -sf $(cat /Users/liujia/software/haproxy/haproxy-queue.pid)');
		//sleep.sleep(2);

	}
});