"use strict";

/** Topic für Inlands-Schlagzeilen. */
const topicInland  = "dozent/decker/nachrichten/inland";

/** Topic für Auslands-Schlagzeilen. */
const topicAusland = "dozent/decker/nachrichten/ausland";


/** <div>-Element, unter dem die <p>-Elemente */
let divNachrichten = null;

/** MQTT-Client für Empfang von Nachrichten. */
let mqttClient = null;


/**
 * Event-Handler-Funktion, wird ausgeführt, wenn das HTML-Dokument
 * vollständig geladen wurde.
 */
window.addEventListener( "load", async function () {

    divNachrichten = document.getElementById( "nachrichten" );

    const empfaengerOption = document.getElementById( "empfangsoptionen" );
    empfaengerOption.addEventListener( "change", onRadioButtonChanged );

    await mqttClientErzeugen();

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * MQTT-Client erzeugen, aber ohne Abonnement.
 */
async function mqttClientErzeugen() {

    const randomHex = Math.random().toString( 16 ).slice( 2, 10 );
    const clientId = "badnews-webclient-" + randomHex; // Beispiel: badnews-webclient-8d095061

    const konfigObjekt = {
        clientId: clientId,
        username: mqttNutzername,
        password: mqttPasswort,
        clean   : true
    };

    mqttClient = await mqtt.connectAsync( mqttUrl, konfigObjekt );

    mqttClient.on( "message", mqttNachrichtEmpfangen );
    mqttClient.on( "error"  , mqttFehlerAufgetreten  );

    console.log( `MQTT-Verbindung mit ClientID=${clientId} aufgebaut.` );
}


/**
 * Event-Handler-Funktion für neue über MQTT empfangene Nachricht.
 *
 * @param {string} Topic der empfangenen Nachricht
 *
 * @param {string} Inhalt der empfangenen Nachricht
 */
function mqttNachrichtEmpfangen( topic, nachricht ) {

    const ressortString = topic.includes( "inland" ) ? "Inland" : "Ausland";

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


/**
 * Event-Handler-Funktion für Änderungen am Radio-Button.
 *
 * @param {*} event Objekt mit Details zum Ereignis
 */
async function onRadioButtonChanged( event ) {

    const neueOption = event.target.value;

    console.log( "Neue Empfangsoption: " + neueOption );

    switch ( neueOption ) {

        case "inland":
            await subscriptionAktualisieren( true, false );
            break;

        case "ausland":
            await subscriptionAktualisieren( false, true );
            break;

        case "beide":
            await subscriptionAktualisieren( true, true );
            break;

        case "keine":
            await subscriptionAktualisieren( false, false );
            break;

        default:
            console.log( `Ungültige Empfangsoption: ${neueOption}` );
    }
};


/**
 * Aktualisiert die Abonnements für Inlands- und Auslandsnachrichten.
 *
 * @param {*} inlandAktiv `true`, wenn Inlandsnachrichten empfangen werden sollen
 *
 * @param {*} auslandAktiv `true`, wenn Auslandsnachrichten empfangen werden sollen
 */
async function subscriptionAktualisieren( inlandAktiv, auslandAktiv ) {

    try {

        // Tabula Rasa
        await mqttClient.unsubscribeAsync( topicInland  );
        await mqttClient.unsubscribeAsync( topicAusland );
        console.log( "Alle Abonnements gelöscht." );

        if ( inlandAktiv ) {

            await mqttClient.subscribeAsync( topicInland );
            console.log( "Abonnement für Inlandsnachrichten erstellt." );
        }
        if ( auslandAktiv ) {

            await mqttClient.subscribeAsync( topicAusland );
            console.log( "Abonnement für Auslandsnachrichten erstellt." );
        }
    }
    catch ( fehler ) {

        console.error( "Fehler beim Aktualisieren der Abonnements: " + fehler );
    }
};
