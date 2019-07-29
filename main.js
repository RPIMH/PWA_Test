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

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    console.log("before the install prompt");
    $("#addToHomeButton").show();
});



window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
  });



$( document ).ready(function() {
    Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
    });

    console.log("doc ready");
    $("#addToHomeButton").on('click', function(e) {
        console.log("clicked it");
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('display-mode is standalone');
        }
        // hide our user interface that shows our A2HS button
        $(this).hide();
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

      $("#notificationButton").on('click', function(e) {

        if (Notification.permission == 'granted') {
                navigator.serviceWorker.getRegistration().then(function(reg) {
                var details = {
                    "body": "Did you want the sale?...",
                    "icon": "DN_icon_192x192.png",
                    "vibrate": [200, 100, 200, 100, 200, 100, 400],
                    "tag": "request",
                    "actions": [
                        { "action": "yes", "title": "Yes" },
                        { "action": "no", "title": "No" }
                    ]
                    }
                reg.showNotification('Woah big sale or something goin on!',details);

            });
        }

      });



});



