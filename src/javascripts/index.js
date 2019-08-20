import ZAFClient from 'zendesk_app_framework_sdk';
import I18n from 'i18n';
import 'helpers';

var client = ZAFClient.init();

client.on('app.registered', function(appData) {
  client.get('currentUser.locale').then(userData => {
    I18n.loadTranslations(userData['currentUser.locale']);
    moment.locale(userData['currentUser.locale']);
    let location = appData.context.location;
    let App = require(`./${location}.js`).default;
    new App(client, appData);
  });
});

client.on('app.willDestroy', function() {
  // to appease validation
});