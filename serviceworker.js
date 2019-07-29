console.log("Hello from serviceworker.js");

var CACHE_NAME = 'my-site-cache';
var urlsToCache = [
 // 'main.js'
];


self.addEventListener('install', function(event) {
    // Perform install steps
    console.log("in the install");
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
  });


self.addEventListener('message', function(event){
    console.log("SW Received Message: " + event.data);
});



self.addEventListener('activate', function(event){
    console.log('activated!');
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
            console.log("hit the cache");
            return response;
            }
            console.log("did not hit the cache this time");
            return fetch(event.request);
        }
        )
    );
});






self.addEventListener('push', function(event) {
    console.log('Received a push message', event);
  
    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = 'DN_512x512.png';
    var tag = 'simple-push-demo-notification-tag';
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag
      })
    );
  });

self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    console.log(event);
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
            return client.focus();
        }
        }
        if (clients.openWindow) {
         return clients.openWindow('/PWA_Test/?clicked=' + event.action);
        }
    }));
});




















