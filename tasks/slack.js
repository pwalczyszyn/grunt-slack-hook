/* jshint node:true */
var request = require('superagent');

module.exports = function (grunt) {

    grunt.registerMultiTask('slack', 'Push info to slack', function () {
        var options = this.options(),
            invalids = [];

        if (!options.webhook) {
            invalids.push('webhook');
        }
        if (!options.channel) {
            invalids.push('channel');
        }
        if (invalids.length > 0) {
            grunt.log.error('grunt-slack-hook plugin is missing following options:', invalids.join(', '));
            return false;
        }

        // We are good to go
        var done = this.async(),
            message = grunt.option('message') || '',
            url = options.webhook,
            data = {
                channel: options.channel,
                text: this.data.text.replace('{{message}}', message)
            };

        if (options.username) {
            data.username = options.username;
        }

        if (options.icon_emoji) {
            data.icon_emoji = options.icon_emoji;
        } else if (options.icon_url) {
            data.icon_url = options.icon_url;
        }

        request.post(url).type('form').send('payload=' + JSON.stringify(data)).end(function (res) {
            if (!res.ok) {
                grunt.log.error('Error sending message to slack: ', res.text);
                return done(false);
            }
            grunt.log.writeln('Message sent to slack successfully!');
            done();
        }).on('error', function (err) { // Handling network error
            grunt.log.error('Error sending message to slack: ', err.message);
            done(false);
        });
    });
};