console.log("Hello from serviceworker.js!");



var CACHE_NAME = 'my-site-cache';
var urlsToCache = [
  '/',
  '/main.js'
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