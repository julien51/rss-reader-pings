# An application which pings stories I read

You'd say [I'm biased](http://superfeedr.com/), but I'm a big fan of RSS. I'm convinced that the open web needs to provide a great "follow" pattern if it ever wants to compete with silos like Twitter of Facebook. 

Unfortunately, publishing RSS feeds is often some kind of "sink": publishers put their data in it... and have very little data as to what happens next. Compare that to social networks where they have follower counts, engagement numbers, number of views. The lack of feedback loop is one of the reasons why it's so hard for publishers to advertise their RSS feeds.

I'm mostly using an RSS reader to stay in touch with the things I care about. Many times, I want to share with the publishers of these stories that I liked them or even that I read them, and with RSS, it's mostly impossible.

I decided to *abuse* the fact that most feed readers these days provide APIs to sync with mobile applications. 

This very simple app just looks at the recently starred items, or the recently read stories and will just ping the URLs using a `HEAD` request to tell the publishers I'm reading them.

If you're a publisher, just look at your HTTP logs and you may see requests indicating I've read or starred your stories!
Here are the fields you may be interested in:

* `From`: this would be my email for now
* `Referer`: my home page so you know it's me :)
* `Ping-read`: the URL of the story I read (if applicable)
* `Ping-starred`: the URL of the story I starred (if applicable)

For now, this just supports Feedbin... and I'm the only user, but since several feed readers use the same API, I may open this up in the future to anyone, which means you may see other readers!

Also, I'm lookin at a solution to "sign" the request with some kind of identity provider. Feel free to submit ideas on how to do this!






