
/**
 * Topic mit JSON-Objekten für neu angelegte Kurzlinks.
 *
 * Topic-Namen fangen laut Konvention ohne "/" an, auch wenn es möglich wäre.
 *
 * Beide Unter-Topics in MQTXX abonnieren: dozent/decker/produkt/#
 */
const topicNachrichten        = "dozent/decker/nachrichten";
const topicNachrichtenInland  = `${topicNachrichten}/inland`;
const topicNachrichtenAusland = `${topicNachrichten}/ausland`;


const mqttKonfigRemote = {
    nutzername : "bob",
    passwort   : "s3cr3t",
    url        : "wss://mqtt.ein-server.de"
};

const mqttKonfigLokal = {
    nutzername: "alice",
    passwort  : "g3h3im",
    url       : "mqtt://localhost:1883",
};


const mqttKonfig = mqttKonfigRemote;
//const mqttKonfig = mqttKonfigLokal;

mqttKonfig.topicNachrichten        = topicNachrichten;
mqttKonfig.topicNachrichtenInland  = topicNachrichtenInland;
mqttKonfig.topicNachrichtenAusland = topicNachrichtenAusland;

module.exports = mqttKonfig;
