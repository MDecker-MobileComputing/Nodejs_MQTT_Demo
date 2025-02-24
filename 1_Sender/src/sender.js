import mqtt    from "mqtt";
import logging from "logging";

import mqttKonfiguration      from "../../mqtt-konfiguration.js";
import { generiereNachricht } from './nachrichtenGenerator.js';

const logger = logging.default( "sender" );


const authObjekt = {

    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort
}

logger.info( `Version Verbindung zu MQTT-Broker ${mqttKonfiguration.url} aufzubauen ...` );
const mqttClient = await mqtt.connectAsync( mqttKonfiguration.url, authObjekt );
logger.info( `Verbindung zu MQTT-Broker ${mqttKonfiguration.url} aufgebaut.` );

while ( true ) {

    const inland = Math.random() < 0.4;

    const nachricht = generiereNachricht( inland );

    const topic = inland ? mqttKonfiguration.topicNachrichtenInland :
                           mqttKonfiguration.topicNachrichtenAusland;

    await mqttClient.publishAsync( topic, nachricht );

    logger.info( `Nachricht auf Topic ${topic} gesendet: ${nachricht}` );

    // Zufällige Zeitspanne zwischen 1 und 2 Sekunden
    const wartezeit = Math.floor( Math.random() * 1000 ) + 1000;
    await new Promise( (resolve) => setTimeout( resolve, wartezeit ) );
}
