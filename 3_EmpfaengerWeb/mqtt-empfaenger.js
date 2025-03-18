"use strict";

let divNachrichten = null;


/**
 * Event-Handler-Funktion, wird ausgeführt, wenn das HTML-Dokument
 * vollständig geladen wurde.
 */
window.addEventListener( "load", async function () {

    divNachrichten = document.getElementById( "nachrichten" );

    await mqttKanalAbonnieren();

    console.log( "Initialisierung abgeschlossen." );
});

/**
 * MQTT-Abonnement für die kanäle "dozent/decker/nachrichten/#".
 */
async function mqttKanalAbonnieren() {

    const clientId = "badnews-webclient-" + Math.random().toString( 16 ).slice( 2, 10 );
    console.log( "Client-ID: " + clientId );

    const konfigObjekt = {
        clientId: clientId,
        username: mqttNutzername,
        password: mqttPasswort,
        clean   : true
    };

    const mqttClient = await mqtt.connectAsync( mqttUrl, konfigObjekt );

    await mqttClient.subscribeAsync( "dozent/decker/nachrichten/#" );

    mqttClient.on( "message", mqttNachrichtEmpfangen  );
    mqttClient.on( "error"  , mqttFehlerAufgetreten   );
}

/**
 * Event-Handler-Funktion für neue über MQTT empfangene Nachricht.
 *
 * @param {string} topic
 *
 * @param {string} nachricht
 */
function mqttNachrichtEmpfangen( topic, nachricht ) {

    let ressortString = topic.includes( "inland" ) ? "Inland" : "Ausland";

    console.log( `${ressortString}snachricht empfangen: ${nachricht}` );

    const spanRessort = document.createElement( "span" );
    spanRessort.classList.add( "fett" );
    spanRessort.textContent = ressortString + ": ";

    const divNachricht = document.createElement( "div" );
    divNachricht.innerHTML = `<p>${spanRessort.outerHTML} ${nachricht}</p>`;

    divNachrichten.appendChild( divNachricht );
}

function mqttFehlerAufgetreten( fehler ) {

    console.error( "MQTT-Fehler aufgetreten: " + fehler );
}
