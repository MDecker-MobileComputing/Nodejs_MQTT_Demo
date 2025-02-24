import mqtt              from "mqtt";
import readlineSync      from "readline-sync";
import mqttKonfiguration from "../../mqtt-konfiguration.js";


console.log();


const authObjekt = {
    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort
}

console.log( `Version Verbindung zu MQTT-Broker ${mqttKonfiguration.url} aufzubauen ...` );
const mqttClient = await mqtt.connectAsync( mqttKonfiguration.url, authObjekt );


while ( true )         {

    const nachricht = "Hallo, Inland!";

    await mqttClient.publishAsync( mqttKonfiguration.topicNachrichtenInland, nachricht );

    console.log( `Nachricht auf Topic ${mqttKonfiguration.topicNachrichtenInland} gesendet: ${nachricht}` );

    // Zufällige Zeitspanne zwischen 1 und 2 Sekunden
    const wartezeit = Math.floor( Math.random() * 1000 ) + 1000;
    await new Promise( (resolve) => setTimeout( resolve, wartezeit ) );
}
