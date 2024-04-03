const express = require('express');
const app = express();
app.use(express.json({extended: true }));
const port = process.env.PORT || 3001;

app.post('/notification', (request, response) => {
  response.send('[accepted]');
  live = new String('');
  pspReference = new String('');
  merchantAccountCode = new String('');
  merchantReference = new String('');
  amountValue = new Number(0);
  amountCurrency = new String('');

  notification = request.body;
  live = notification.live;
  if(live.toString() === 'true'){
    for (let i = 0; i < notification.notificationItems.length; i++) {
      Item = notification.notificationItems[i];
      pspReference = Item.NotificationRequestItem.pspReference;
      merchantAccountCode = Item.NotificationRequestItem.merchantAccountCode
      merchantReference = Item.NotificationRequestItem.merchantReference;
      amountValue = Item.NotificationRequestItem.amount.value;
      amountCurrency = Item.NotificationRequestItem.amount.currency;
      if (typeof pspReference === "undefined" || typeof merchantAccountCode === "undefined"|| typeof merchantReference === "undefined" || typeof amountValue === "undefined" || typeof amountCurrency === "undefined"){
        console.log('At least one of the following values is undefined: pspReference: ' + pspReference + ', merchantAccountCode: ' + merchantAccountCode + ', merchantReference: ' +merchantReference + ', amountValue: ' + amountValue + ', amountCurrency: ' + amountCurrency);       
      }else{
        console.log('Going to send capture request with the following values: pspReference: ' + pspReference + ', merchantAccountCode: ' + merchantAccountCode + ', merchantReference: ' +merchantReference + ', amountValue: ' + amountValue + ', amountCurrency: ' + amountCurrency);
        prefix = process.env.PREFIX;
        version = 'v71'; 
        paymentURL = 'https://' + prefix + '-checkout-live.adyenpayments.com/checkout/' + version + '/payments/'+ pspReference + '/captures';
        var request = require('request');
        var captureRequest = {
          'merchantAccount': merchantAccountCode,
          'amount' : {
            'currency' : amountCurrency,
            'value' : amountValue
          },
          'reference' : merchantReference + ' capture'
        }
        request({
          url: paymentURL,
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': process.env.xapikey,
          },
          json: true,
          body: captureRequest,
        },function(error, response, body){
          console.log('status is: ' + response.body.status +' for PSP: '+ pspReference);
        }
        );
      }    
  } 
  }
  else{
    console.log('notification is not for live environment: ', pspReference, merchantReference,amountValue, amountCurrency);
  }
});
app.get('/', (request, response) => {
  response.type('html')
  console.log('Request', request.body);
  response.send('Hello world');
});
const server = app.listen(port, () => console.log(`Listening on ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;