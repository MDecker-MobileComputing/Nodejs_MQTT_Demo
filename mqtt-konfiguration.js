
/**
 * Topic mit JSON-Objekten für neu angelegte Kurzlinks.
 *
 * Topic-Namen fangen laut Konvention ohne "/" an, auch wenn es möglich wäre.
 *
 * Beide Unter-Topics in MQTXX abonnieren: dozent/decker/nachrichten/#
 */


const mqttKonfigRemote = {
    nutzername : "",
    passwort   : "",
    url        : "wss://mqtt...."
};

const mqttKonfigLokal = {
    nutzername: "alice",
    passwort  : "g3h3im",
    url       : "ws://localhost:8083/mqtt",
};

const mqttKonfig = mqttKonfigRemote;
//const mqttKonfig = mqttKonfigLokal;

mqttKonfig.topicNachrichten        = "dozent/decker/nachrichten";
mqttKonfig.topicNachrichtenInland  = `${mqttKonfig.topicNachrichten}/inland`;
mqttKonfig.topicNachrichtenAusland = `${mqttKonfig.topicNachrichten}/ausland`;

module.exports = mqttKonfig;











