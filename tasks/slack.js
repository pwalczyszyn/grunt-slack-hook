/* jshint node:true */
var request = require('superagent');

module.exports = function(grunt) {

    grunt.registerMultiTask('slack', 'Push info to slack', function() {
        var options = this.options();

        // We are good to go
        var done = this.async(),
            message = grunt.option('message') || '',
            url = options.endpoint ? options.endpoint : 'https://' + options.domain + '.slack.com/services/hooks/incoming-webhook?token=' + options.token,
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

        request.post(url).type('form').send('payload=' + JSON.stringify(data)).end(function(res) {
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