console.log("Hello from serviceworker.js");

var CACHE_NAME = 'my-site-cache';
var urlsToCache = [
  'main.js'
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