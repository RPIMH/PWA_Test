if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
        });
    });
}


window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    let deferredPrompt = e;
    console.log("before the install prompt");


    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('display-mode is standalone');
      }
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
        });
});



window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
  });