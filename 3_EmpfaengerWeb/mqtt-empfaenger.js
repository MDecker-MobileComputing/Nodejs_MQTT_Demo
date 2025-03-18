"use strict";

let divNachrichten = null;

const mqttUrl        = "wss://mqtt.der-server.de";
const mqttNutzername = "alice";
const mqttPasswort   = "g3h3im";


window.addEventListener( "load", async function () {

    divNachrichten = document.getElementById( "nachrichten" );

    await mqttKanalAbonnieren();

    console.log( "Initialisierung abgeschlossen." );
});


async function mqttKanalAbonnieren() {

    const clientId = "badnews-webclient-" + Math.random().toString( 16 ).slice( 2, 10 );
    console.log( "Client-ID: " + clientId );

    const konfigObjekt = {
        clientId: clientId,
        username: mqttNutzername,
        password: mqttPasswort,
        clean   : true
    };

    const mqttClient = mqtt.connectAsync( mqttUrl, konfigObjekt );

    await mqttClient.subscribeAsync( "dozent/decker/nachrichten/#" );

    mqttClient.on( "connect", mqttVerbindungAufgebaut );
    mqttClient.on( "message", mqttNachrichtEmpfangen  );
    mqttClient.on( "error"  , mqttFehlerAufgetreten   );
}

function verbindungAufgebaut() {

    console.log( "Verbindung zum MQTT-Broker hergestellt." );
}

function nachrichtEmpfangen( topic, nachricht ) {

    console.log( "Nachricht empfangen: " + topic + " -> " + nachricht );

    const divNachricht = document.createElement( "div" );
    divNachricht.textContent = topic + " -> " + nachricht;
    divNachrichten.appendChild( divNachricht );
}

function mqttFehlerAufgetreten( fehler ) {

    console.error( "MQTT-Fehler aufgetreten: " + fehler );
}
