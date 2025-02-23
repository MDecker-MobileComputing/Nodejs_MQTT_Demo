import mqtt              from "mqtt";
import readlineSync      from "readline-sync";
import mqttKonfiguration from "../../mqtt-konfiguration.js";


console.log();

function frageHardwareSoftwareEnde() {

    let buchstabe = "";
    do {

        buchstabe = readlineSync.question( 
            "Bestellung (H)ardware oder (S)oftware oder (E)nde > " 
        );
            
        buchstabe = buchstabe.toUpperCase();

    } while ( buchstabe !== "H" && buchstabe !== "S" && buchstabe !== "E" ); 

    return buchstabe;
}


function bestimmteTopic( hardwareOderSoftware ) {

    switch ( hardwareOderSoftware ) {

        case "H":
            return mqttKonfiguration.topicProduktHardware;
    
        case "S":
            return mqttKonfiguration.topicProduktSoftware;
    
        default:
            console.error( `Unerwarteter Fall: ${hardwareOderSoftware}` );
            process.exit( 1 );
    }
}

const authObjekt = {

    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort
};

const mqttClient = await mqtt.connectAsync( mqttKonfiguration.url, authObjekt );
console.log( `Verbindung mit MQTT-Broker ${mqttKonfiguration.url} aufgebaut.\n` );

mqttClient.on( "connect"  , ()       => { console.log(   "MQTT-Event 'connect'"   ); });
mqttClient.on( "reconnect", ()       => { console.log(   "MQTT-Event 'reconnect'" ); });
mqttClient.on( "close"    , ()       => { console.log(   "MQTT-Event 'close'"     ); });
mqttClient.on( "offline"  , ()       => { console.log(   "MQTT-Event 'offline'"   ); });
mqttClient.on( "error"    , (fehler) => { console.error( `MQTT-Event 'error': ${fehler}` ); });
    

while ( true ) {

    let buchstabe = frageHardwareSoftwareEnde();

    if ( buchstabe === "E" ) {

        console.log( "\nProgrammende\n" );
        process.exit( 0 );
    }

    let zielTopic = bestimmteTopic( buchstabe );

    const produkt = readlineSync.question( "Produkt > " );

    await mqttClient.publishAsync( zielTopic, produkt );
    console.log( `Neues Produkt "${produkt}" an Topic "${zielTopic}" gesendet.\n` );

    console.log();
}
