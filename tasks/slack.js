/* jshint node:true */
var request = require('superagent');

module.exports = function (grunt) {

    grunt.registerMultiTask('slack', 'Push info to slack', function () {

        var done = this.async(),
            options = this.options(),
            url = 'https://' + options.domain + '.slack.com/services/hooks/incoming-webhook?token=' + options.token,
            data = {
                channel: options.channel,
                text: this.data.text
            };

        if (options.username) {
            data.username = options.username;
        }

        if (options.icon_emoji) {
            data.icon_emoji = options.icon_emoji;
        } else if (options.icon_url) {
            data.icon_url = options.icon_url;
        }

        request
            .post(url)
            .send('payload=' + JSON.stringify(data))
            .success(function () {
            grunt.log.writeln('Message sent to slack successfully!');
            done();

        }).error(function (err) {
            grunt.log.error('Error sending message to slack: ', err.message);
            done(false);
        });
    });

};
