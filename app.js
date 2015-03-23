var express = require('express');
var request = require('request');
var app = express();
var port = process.env.PORT || 3001;

var slack_token = process.env.SLACK_TOKEN;
var channel = process.env.CHANNEL;
var image = process.env.IMAGE_NAME;
var BASE_URL = 'https://slack.com/api/chat.postMessage?token=' + slack_token + '&';


var imageMe = function(query, animated, faces, cb) {
  if (typeof animated === 'function') {
    cb = animated;
  }
  if (typeof faces === 'function') {
    cb = faces;
  }
  var url = 'http://ajax.googleapis.com/ajax/services/search/images';
  var qs = {
    v: '1.0',
    rsz: '8',
    q: query,
    safe: 'active'
  };
  return request({url: url, qs: qs}, function(err, res, body) {
    var image, images, _ref;
    images = JSON.parse(body);
    images = (_ref = images.responseData) != null ? _ref.results : void 0;
    if ((images != null ? images.length : void 0) > 0) {
      image =  random(images);
      return cb(ensureImageExtension(image.unescapedUrl));
    }
  });
};

var ensureImageExtension = function(url) {
  var ext;
  ext = url.split('.').pop();
  if (/(png|jpe?g|gif)/i.test(ext)) {
    return url;
  } else {
    return url + "#.png";
  }
};

var inquiry = function(channel) {
  return imageMe(image, function(url) {
    var slack_url = BASE_URL + 'channel=' + channel + '&text=' + url + '&link_names=1';
    return request(slack_url, function(err, res, body) {
    });
  });
};

var random = function(items) {
	return items[Math.floor(Math.random() * items.length)];
}

app.get('/image', function(req, res){
	inquiry(channel);
	res.sendStatus(200);
})

app.listen(port);