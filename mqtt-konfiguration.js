
/**
 * Topic mit JSON-Objekten für neu angelegte Kurzlinks.
 *
 * Topic-Namen fangen laut Konvention ohne "/" an, auch wenn es möglich wäre.
 * 
 * Beide Unter-Topics in MQTXX abonnieren: dozent/decker/produkt/#
 */
const topicProdukt         = "dozent/decker/produkt";
const topicProduktHardware = `${topicProdukt}/hardware`;
const topicProduktSoftware = `${topicProdukt}/software`;


const mqttKonfigRemote = {
    nutzername : "bob",
    passwort   : "s3cr3t",
    url        : "wss://mqtt.server.com"
};

const mqttKonfigLokal = {
    nutzername: "alice",
    passwort  : "g3h3im",
    url       : "mqtt://localhost:1883",
};


const mqttKonfig = mqttKonfigRemote;
//const mqttKonfig = mqttKonfigLokal;

mqttKonfig.topicProdukt         = topicProdukt;
mqttKonfig.topicProduktHardware = topicProduktHardware;
mqttKonfig.topicProduktSoftware = topicProduktSoftware;

module.exports = mqttKonfig;
