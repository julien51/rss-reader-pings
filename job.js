var Redis = require("redis");

var redis = Redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

var User = require(__dirname + '/models/user.js')(redis);
var Cache = require(__dirname + '/readers/cache.js')(redis);
var Ping = require(__dirname + '/readers/ping.js')();

User.batch(function(u, next) {
	u.reader.sync(function(error, items) {


		function pingNextIfNew(items) {
			var item = items.pop();

			if(!item) 
				return next();

			Cache.filter(u, item, function(error, filtered) {
				if(filtered)
					return pingNextIfNew(items);

				Ping.ping(u, item, function() {
					pingNextIfNew(items);
				});
			});
		}

		pingNextIfNew(items);

	});



}, function() {
	process.exit();
});

