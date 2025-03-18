"use strict";

/** <div>-Element, unter dem die <p>-Elemente */
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

    const randomHex = Math.random().toString( 16 ).slice( 2, 10 );
    const clientId = "badnews-webclient-" + randomHex; // Beispiel: badnews-webclient-8d095061
    console.log( "Client-ID: " + clientId );

    const konfigObjekt = {
        clientId: clientId,
        username: mqttNutzername,
        password: mqttPasswort,
        clean   : true
    };

    const mqttClient = await mqtt.connectAsync( mqttUrl, konfigObjekt );

    await mqttClient.subscribeAsync( "dozent/decker/nachrichten/#" );

    mqttClient.on( "message", mqttNachrichtEmpfangen );
    mqttClient.on( "error"  , mqttFehlerAufgetreten  );
}


/**
 * Event-Handler-Funktion für neue über MQTT empfangene Nachricht.
 *
 * @param {string} Topic der empfangenen Nachricht
 *
 * @param {string} Inhalt der empfangenen Nachricht
 */
function mqttNachrichtEmpfangen( topic, nachricht ) {

    let ressortString = topic.includes( "inland" ) ? "Inland" : "Ausland";

    console.log( `${ressortString}snachricht empfangen: ${nachricht}` );

    const spanRessort = document.createElement( "span" );
    spanRessort.classList.add( "fett" );
    spanRessort.textContent = ressortString + ": ";

    const divNachricht = document.createElement( "p" );
    divNachricht.innerHTML = `${spanRessort.outerHTML} ${nachricht}`;

    divNachrichten.appendChild( divNachricht );
}


/**
 * MQTT-Fehlermeldung auf der Konsole ausgeben.
 *
 * @param {*} Objekt mit Fehlerbeschreibung
 */
function mqttFehlerAufgetreten( fehler ) {

    console.error( "MQTT-Fehler aufgetreten: " + fehler );
}
