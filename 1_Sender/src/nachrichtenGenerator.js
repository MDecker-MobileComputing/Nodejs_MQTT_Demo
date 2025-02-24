import logging from "logging";

// für Java-Variante dieser Datei siehe:
// https://github.com/MDecker-MobileComputing/Maven_SpringBoot_WebSockets/blob/master/src/main/java/de/eldecker/dhbw/spring/websockets/logik/SchlagzeilenErzeuger.java

const logger = logging.default( "nachrichten" );

const ereignisseArray = [
    "Altersarmut", "Amoklauf", "Ausgangs-Sperre", "Ärztemangel", "Ausschreitungen",
    "Bankrott", "Bildungsnotstand", "Busunfall", "Brandstiftung", "Chemie-Unfall",
    "Cyberangriff", "Doping-Skandal", "Drogenkriminalität", "Dürre", "Entführung",
    "Erdbeben", "Erdrutsch", "Erpressung", "Explosion", "Finanzkrise", "Gasexplosion",
    "Gewaltserie", "Geflügelpest", "Großbrand", "Großschadenslage", "Hausbesetzung",
    "Handwerkermangel", "Hitzewelle", "Korruption", "Lawine", "Lebensmittelskandal",
    "Lehrermangel", "Massenkarambolage", "Massenpanik", "Mord", "Ölkatastrophe",
    "Regierungskrise", "Rinderwahn", "Rohstoffknappheit", "Schiffskollision", "Skandal",
    "Smog-Alarm", "Studierendenproteste", "Stromausfall", "Tierseuche", "Unwetter",
    "Überfall", "Überschwemmung", "Wahlmanipulation", "Waldbrand", "Waldsterben",
    "Wirtschaftskrise", "Vulkanausbruch"
];

const orteDeutschlandArray = [
    "Baden-Württemberg", "Bayern", "Bremen", "Berlin", "Brandenburg",
    "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
    "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
    "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"
];

const orteAuslandArray = [
    "Albanien", "Amerika", "Andorra", "Argentinien", "Armenien", "Australien",
    "Brasilien", "Belgien", "Bosnien", "Bulgarien",
    "China", "Chile",
    "Dänemark",
    "Estland", "Ecuador",
    "Finnland", "Frankreich",
    "Griechenland", "Großbritannien",
    "Herzegowina", "Holland",
    "Iran", "Irak", "Irland", "Island", "Italien",
    "Japan", "Jamaika", "Jordanien",
    "Kanada", "Kosovo", "Kolumbien", "Kroatien",
    "Lettland", "Liechtenstein", "Litauen", "Luxemburg",
    "Malta", "Mazedonien", "Moldawien", "Monaco", "Montenegro",
    "Norwegen", "Nepal",
    "Oman", "Österreich",
    "Panama", "Peru", "Polen", "Pakistan", "Portugal",
    "Rumänien", "Russland",
    "San Marino", "Schweden", "der Schweiz", "Senegal", "Serbien", "Singapur",
    "Slowakei", "Slowenien", "Spanien", "Süd-Afrika",
    "Taiwan", "Tunesien", "Tschechien", "der Türkei",
    "der Ukraine", "Ungarn",
    "Vatikanstadt",
    "Weißrussland"
];

logger.info( "Anzahl Ereignisse: "       + ereignisseArray.length      );
logger.info( "Anzahl Orte Deutschland: " + orteDeutschlandArray.length );
logger.info( "Anzahl Orte Ausland: "     + orteAuslandArray.length     );


function getZufallsElementAusArray( array ) {

    const index = Math.floor( Math.random() * array.length );
    return array[ index ];
}


export function generiereNachricht( inland ) {

    const ereignis = getZufallsElementAusArray( ereignisseArray );

    const ort = inland ? getZufallsElementAusArray( orteDeutschlandArray ) :
                         getZufallsElementAusArray( orteAuslandArray     );

    return `${ereignis} in ${ort}`;
}
