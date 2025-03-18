
/**
 * Topic mit JSON-Objekten für neu angelegte Kurzlinks.
 *
 * Topic-Namen fangen laut Konvention ohne "/" an, auch wenn es möglich wäre.
 *
 * Beide Unter-Topics in MQTXX abonnieren: dozent/decker/nachrichten/#
 */


const mqttKonfigRemote = {
    nutzername : "dhbw",
    passwort   : "dhbw",
    url        : "wss://mqtt.zimolong.eu"
};

const mqttKonfigLokal = {
    nutzername: "alice",
    passwort  : "g3h3im",
    url       : "mqtt://localhost:1883",
};

const mqttKonfig = mqttKonfigRemote;
//const mqttKonfig = mqttKonfigLokal;

mqttKonfig.topicNachrichten        = "dozent/decker/nachrichten";
mqttKonfig.topicNachrichtenInland  = `${mqttKonfig.topicNachrichten}/inland`;
mqttKonfig.topicNachrichtenAusland = `${mqttKonfig.topicNachrichten}/ausland`;

module.exports = mqttKonfig;











