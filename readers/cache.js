function Cache() {
	// 
}

var redis = null;

Cache.filter = function filter(user, item, cb) {
	var k = ["cache", user.id].join(':');



	redis.hsetnx(k, JSON.stringify(item), new Date().getTime(), function(error, value) {
		if(error)
			console.error('Error checking', item, 'for', user.id, error);

		if(!value)
			console.info('Already seen', item, 'for', user.id);
		else
			console.info('New item', item, 'for', user.id);
			
		return cb(error, !value);

	});
}

module.exports = function(_redis) {
	redis = _redis;
	return Cache;
};
