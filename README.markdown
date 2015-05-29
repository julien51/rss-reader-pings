# An application which pings stories I read

You'd say [I'm biased](http://superfeedr.com/), but I'm a big fan of RSS. I'm convinced that the open web needs to provide a great "follow" pattern if it ever wants to compete with silos like Twitter of Facebook. 

Unfortunately, publishing RSS feeds is often some kind of "sink": publishers put their content in them... and have very little data as to what happens next. Compare that to social networks where they have follower counts, engagement numbers, number of views. The lack of feedback loop is one of the reasons why it's so hard for publishers to advertise their RSS feeds.

I'm mostly using an RSS reader to stay in touch with the things I care about. Often, I want to share with the publishers of these stories that I liked them or even that I read them, and with RSS, it's mostly impossible (one of the sad consequences of the otherwise amazing decoupling between publishing and reading platforms).

This app solves this itch.

## How?

I decided to *abuse* the fact that most feed readers these days provide APIs to sync with mobile applications. 

This very simple app just looks at the recently starred items, or the recently read stories and will just ping the URLs using a `HEAD` request to tell the publishers I'm reading them. That should be extra *hits* in the server-side analytics solution :)

If you're a publisher, just look at your HTTP logs and you may see requests indicating I've read or starred your stories!
Here are the fields you may be interested in:

* `From`: this would be my email for now
* `Referer`: my home page so you know it's me :)
* `Ping-read`: the URL of the story I read (if applicable)
* `Ping-starred`: the URL of the story I starred (if applicable)

Of course, you could easily also keep track of this data on your end and save it to consume it in a more convenient way than just looking at logs!

## Going further

For now, this just supports [Feedbin](https://feedbin.com/)... and I'm the only user, but since several feed readers use the same API, I may open this up in the future to anyone, which means you may see other readers!

I want to check if Feedbin supports a better auth than using passwords too...

Also, I'm lookin at a solution to "sign" the request with some kind of identity provider. Feel free to submit ideas on how to do this!

## Running your own?

Feel free to fork. At this point, you only need to run the `job.js` script to 'sync' the data with your feed reader. It uses redis as a cache. 

Something like:

```
#!/bin/sh

export REDIS_PORT=6379;
export REDIS_HOST=127.0.0.1;

/usr/local/bin/node job.js
```

Should be enough... but make sure you previously add a user with:

```
redis-cli hmset user:1 name <yourname> url <a url to learn more about you> reader:app <name of your reader> reader:login <your login in the rss reader> reader:password <your password in the RSS reader>
```






