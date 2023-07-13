const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent showing the default install prompt
    event.preventDefault();
    // Stash the event so it can be triggered later
    window.deferredPrompt = event;
    // remove the `hidden` attribute from the install button
    butInstall.removeAttribute('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // retrieve the deferred prompt
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    // show the install prompt
    promptEvent.prompt();
    // wait for the user to respond to the prompt
    const result = await promptEvent.userChoice;
    // hide the install button
    butInstall.setAttribute('hidden', true);
    // clear the deferred prompt
    window.deferredPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // log the installation
    console.log('Jate was installed.', event);
});
