window.addEvent("domready", function () {
    // Option 1: Use the manifest:
    new FancySettings.initWithManifest(function (settings) {
        //settings.manifest.myButton.addEvent("action", function () {
        //    alert("You clicked me!");
        //});

        var yaxis = localStorage.getItem("store.settings.kinetic_jaxis");
        if (!yaxis) localStorage.setItem("store.settings.kinetic_jaxis", 'yes');
        chrome.storage.sync.set({'yaxis': yaxis});

        var xaxis = localStorage.getItem("store.settings.kinetic_xaxis");
        if (!xaxis) localStorage.setItem("store.settings.kinetic_xaxis", 'yes');
        chrome.storage.sync.set({'xaxis': xaxis});

        var snap = localStorage.getItem("store.settings.default_snap");
        if (!snap) localStorage.setItem("store.settings.default_snap", 'yes');
        chrome.storage.sync.set({'snap': snap});

        var sensitivity = localStorage.getItem("store.settings.zoom_sensitivity");
        if (!sensitivity) localStorage.setItem("store.settings.zoom_sensitivity", 0.06);
        chrome.storage.sync.set({'sensitivity': sensitivity});

        var throttleFPS = localStorage.getItem("store.settings.kinetic_throttleFPS");
        if (!throttleFPS) localStorage.setItem("store.settings.kinetic_throttleFPS", 0.60);
        chrome.storage.sync.set({'throttleFPS': throttleFPS});

        var slowdown = localStorage.getItem("store.settings.kinetic_slowdown");
        if (!slowdown) localStorage.setItem("store.settings.kinetic_slowdown", 0.09);
        chrome.storage.sync.set({'slowdown': slowdown});

        var maxvelocity = localStorage.getItem("store.settings.kinetic_maxvelocity");
        if (!maxvelocity) localStorage.setItem("store.settings.kinetic_maxvelocity", 0.40);
        chrome.storage.sync.set({'maxvelocity': maxvelocity});
    });

    // Option 2: Do everything manually:
    /*
     var settings = new FancySettings("My Extension", "icon.png");

     var username = settings.create({
     "tab": i18n.get("information"),
     "group": i18n.get("login"),
     "name": "username",
     "type": "text",
     "label": i18n.get("username"),
     "text": i18n.get("x-characters")
     });

     var password = settings.create({
     "tab": i18n.get("information"),
     "group": i18n.get("login"),
     "name": "password",
     "type": "text",
     "label": i18n.get("password"),
     "text": i18n.get("x-characters-pw"),
     "masked": true
     });

     var myDescription = settings.create({
     "tab": i18n.get("information"),
     "group": i18n.get("login"),
     "name": "myDescription",
     "type": "description",
     "text": i18n.get("description")
     });

     var myButton = settings.create({
     "tab": "Information",
     "group": "Logout",
     "name": "myButton",
     "type": "button",
     "label": "Disconnect:",
     "text": "Logout"
     });

     // ...

     myButton.addEvent("action", function () {
     alert("You clicked me!");
     });

     settings.align([
     username,
     password
     ]);
     */
});
