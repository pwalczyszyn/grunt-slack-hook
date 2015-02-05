/* jshint node:true */
var request = require('superagent');

module.exports = function(grunt) {

    grunt.registerMultiTask('slack', 'Push info to slack', function() {
        var options = this.options();

        if(options.token || options.domain){
            grunt.log.warn('Sending Slack web hooks via `token` and `domain` has been deprecated!');
        }

        if(!options.endpoint){
            grunt.log.error('Slack web hook endpoint must be defined.');
            return;
        }

        var done = this.async(),
            message = grunt.option('message') || '',
            data = {
                text: this.data.text.replace('{{message}}', message)
            };

        if(options.channel){
            data.channel = options.channel;
        }

        if (options.username) {
            data.username = options.username;
        }

        if (options.icon_emoji) {
            data.icon_emoji = options.icon_emoji;
        } else if (options.icon_url) {
            data.icon_url = options.icon_url;
        }

        request.post(options.endpoint).type('form').send('payload=' + JSON.stringify(data)).end(function(res) {
            if (!res.ok) {
                grunt.log.error('Error sending message to slack: ', res.text);
                return done(false);
            }
            grunt.log.writeln('Message sent to slack successfully!');
            done();
        }).on('error', function(err) { // Handling network error
            grunt.log.error('Error sending message to slack: ', err.message);
            done(false);
        });
    });
};