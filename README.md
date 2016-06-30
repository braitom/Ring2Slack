# Ring2Slack
This application aims to post a picture to Slack. I have assumed a mainly posts from Ring.

## Setup

This application has been made to work with heroku.

1. Clone this repo locally. `git clone https://github.com/braitom/Ring2Slack.git`
2. `cd Ring2Slack`
3. `heroku login`
4. `heroku create your-app-name`
5. To set Heroku config to use the following.
   ```
   heroku config:set SLACK_TOKEN='your-slack-token'
   
   heroku config:set IMAGE_NAME='image-keyword'
   
   heroku config:set CHANNEL='your-slack-channel-name'
   ```
6. `git push heroku master`



Alternatively, you can deploy the app using this button:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Using
* GET `/image`  
You can post to random images that you specify to Slack.


## License
MIT License
