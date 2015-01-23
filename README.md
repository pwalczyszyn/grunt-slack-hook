# grunt-slack-hook

> Grunt plugin that can push messages to [slack](http://slack.com/) service using web hooks.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-slack-hook --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-slack-hook');
```

## The "plugin" task

### Overview
In your project's Gruntfile, add a section named `plugin` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  slack: {
    options: {
        token: 'slack token', // get one from here: https://typekit.slack.com/services
        domain: 'domain', // https://domain.slack.com
        channel: 'general', // specify channel without the hash
        username: 'webhookbot', // name of the Slack bot
        icon_emoji: ':ghost:',
        icon_url: 'https://slack.com/img/icons/app-57.png' // if icon_emoji not specified
    },
    your_target: {
      text: 'Text you want to push to slack.com {{message}}' // {{message}} can be replaced with --message='some text' option from command line
    },
  },
});
```

## License

    MIT
