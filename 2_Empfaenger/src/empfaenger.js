import mqtt    from "mqtt";
import logging from "logging";

import mqttKonfiguration from "../../mqtt-konfiguration.js";


const logger = logging.default( "empfaenger" );

if ( process.argv.length < 3 ) {

    logger.error( `Bitte als Argument "inland", "ausland" oder "alle" übergeben.` );
    process.exit( 1 );
}

const argument = process.argv[ 2 ];
let topic = mqttKonfiguration.topicNachrichten + "/#"; // #: Multilevel-Wildcard

if ( argument === "inland" ) {

    topic = mqttKonfiguration.topicNachrichtenInland;

} else if ( argument === "ausland" ) {

    topic = mqttKonfiguration.topicNachrichtenAusland;
}

const authObjekt = {

    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort
}

logger.info( `Version Verbindung zu MQTT-Broker ${mqttKonfiguration.url} aufzubauen ...` );
const mqttClient = await mqtt.connectAsync( mqttKonfiguration.url, authObjekt );
logger.info( `Verbindung zu MQTT-Broker ${mqttKonfiguration.url} aufgebaut.` );


await mqttClient.subscribeAsync( topic );
logger.info( `Topic abonniert: ${topic}` );

mqttClient.on( "message", ( topic, nachricht ) => {

    logger.info( `Nachricht auf Topic ${topic} empfangen: ${nachricht}` );
});
