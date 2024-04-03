const express = require('express');
const app = express();
app.use(express.json({extended: true }));
const port = process.env.PORT || 3001;

app.post('/notification', (request, response) => {
  response.send('[accepted]');
  live = new String('');
  pspReference = new String('');
  merchantReference = new String('');
  amountValue = new Number(0);
  amountCurrency = new String('');

  notification = request.body;
  live = notification.live;
  if(live.toString() === 'true'){
    for (let i = 0; i < notification.notificationItems.length; i++) {
      Item = notification.notificationItems[i];
      pspReference = Item.NotificationRequestItem.pspReference;
      merchantReference = Item.NotificationRequestItem.merchantReference;
      amountValue = Item.NotificationRequestItem.amount.value;
      amountCurrency = Item.NotificationRequestItem.amount.currency;
      if (typeof pspReference === "undefined" || typeof merchantReference === "undefined" || typeof amountValue === "undefined" || typeof amountCurrency === "undefined"){
        console.log('At least one of the following values is undefined: pspReference: ' + pspReference + ', merchantReference: ' +merchantReference+ ', amountValue: ' +amountValue+ ', amountCurrency: ' +amountCurrency);       
      }else{
        console.log('Going to send capture request with the following values: pspReference: ' + pspReference + ', merchantReference: ' +merchantReference+ ', amountValue: ' +amountValue+ ', amountCurrency: ' +amountCurrency);   
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