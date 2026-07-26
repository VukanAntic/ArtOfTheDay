/** @type {import('@bacons/apple-targets/app.plugin').Config} */
module.exports = {
  type: 'widget',
  name: 'ArtOfTheDayWidget',
  displayName: 'Art of the Day',
  icon: '../../assets/images/icon.png',
  deploymentTarget: '17.0',
  frameworks: ['SwiftUI', 'WidgetKit'],
  entitlements: {
    'com.apple.security.application-groups': ['group.com.artoftheday.widget'],
  },
  colors: {
    widgetBackground: { light: '#F5F3EF', dark: '#19201F' },
  },
};
