var request = require('request');

function Ping() {
}

Ping.ping = function ping(user, item, cb) {
	var headers = {
		'User-Agent': 'Read more about this at https://github.com/julien51/rss-reader-pings',
		'From': user.name,
		'Referer': user.url,
	};

  var action = Object.keys(item)[0];
  var url = item[action];

	headers[['Ping',action].join('-')] = url; // This is double effect...

	request.head({
		url: url,
		headers: headers
	}, function(error, response, body) {
		if(error)
			console.error(error, 'when pingin', url, 'for', user.id, action);
		else
			console.info('Pinged', url, 'because', user.id, action, 'it');

		return cb();
	})
}


module.exports = function() {
	return Ping;
};
