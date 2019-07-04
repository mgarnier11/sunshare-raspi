//Injection condiÃ©rÃ©e comme consommation ds un premier temps
//Conso = 3 784 320 Wh/an -> 10 000 Wh/j dont 6 sur 06h-18h et 4 la nuit
// Prod = 3650 kWh/an -> 10 000 Wh/j sur 06h-18h selon parabole
//Il faudrait utiliser une variable globale pour la date depuis la derniere mesure
// Par dÃ©faut, pas de 10s, plateau de 1Wh/10s la nuit et moyenne de 1,4 le jour

var membre =
  // flow.get('membre');
  {
    pseudo: 'SunShareOrvo',
    id: '00x00Aa',
    ADSC: 21675051387,
    PDL: 14282923268426,
    Psoutir: 6,
    profil: 'BASE',
    Pprod: 3,
    productible: 1200
  };

//Pour crÃ©er un simulateur, on recule d'un an et on accÃ©lÃ©rer le graphe x60 (1 minute correspond Ã  une heure)
//var onTime= flow.get("onTime");//timestamp du dÃ©marrage de la machine
//var timeNow = onTime.getTime() - 365*24*60*60*1000 + (msg.payload - onTime.getTime())*60 ; // // Recul d'un an dans le temps et accÃ©lÃ©ration 1s = 1min => x60x15

var timeNow = msg.payload; // Ajouter pour dÃ©caler de 12h pour des tests
timeNow = new Date(timeNow); // au format date
msg.timenow = timeNow.getTime(); //timestamp

//var SimulIdx = flow.get("SimulIdx");
//var TAB = [msg.timenow, 0, 0, 0, 0, timeNow]; // timeNow, soutir, inject, prod, autoconso

var SnSrSimul = flow.get('SnSrSimul'); // Variable GLOBALE Conserve les derniers index et le  timestamp de la derniere simulation

var conso = 0;
var soutir = 0;
var inject = 0;
var prod = 0;
var autoconso = 0;

var rand = Math.random() / 5; //moyenne 0,1
var rand1 = Math.round(Math.random()); // 0 ou 1

var puis = membre.Pprod; // puissance de l'onduleur en kWc
var productible = membre.productible; // productible en kWh/kWc
// prod en parabole
// puis(kWca) x 1000/2,3955 x (-1 x ((hours-12)/6)^2 + 1)
// mettre la variable dans msg.count comme le node impulsion

// TIMESTAMP YYYYMMDDhhmmss
var annee = timeNow.getFullYear();
var mois = timeNow.getMonth() + 1; // getMonth() renvoie un mois de 0 Ã  11
var jour = timeNow.getDate();
var hours = timeNow.getHours();
var minutes = timeNow.getMinutes();
var secondes = timeNow.getSeconds();

// Table des paramÃ¨tres solaires des jours et d'Ã©nergie
// Pour chaque mois : Nojour, date21, lever, coucher, facteur de production (CS de ENEDIS dans profil PRD3)
// source : http://calendriersolaire.com/fr/paris

var SunCal = [];
SunCal.push([355, '20181221', '084123', '165620', 0.294]); // SunCal[0] = SunCal[12]
SunCal.push([21, '20180121', '083301', '173100', 0.388]); // SunCal[1]
SunCal.push([52, '20180221', '074648', '182127', 0.758]); // SunCal[2]
SunCal.push([80, '20180321', '065008', '190508', 1.054]); // SunCal[3]
SunCal.push([111, '20180421', '064703', '205123', 1.3]); // SunCal[4]
SunCal.push([141, '20180521', '060050', '213335', 1.476]); // SunCal[5]
SunCal.push([172, '20180621', '054659', '215758', 1.576]); // SunCal[6]
SunCal.push([202, '20180721', '0601032', '214333', 1.541]); // SunCal[7]
SunCal.push([233, '20180821', '065224', '205452', 1.352]); // SunCal[8]
SunCal.push([264, '20180921', '073618', '195045', 1.107]); // SunCal[9]
SunCal.push([294, '20181021', '082049', '184929', 0.768]); // SunCal[10]
SunCal.push([325, '20181121', '080920', '170347', 0.392]); // SunCal[11]
SunCal.push([355, '20181221', '084123', '165620', 0.294]); // SunCal[12]
SunCal.push([386, '20180121', '083301', '173100', 0.388]); // SunCal[13] = SunCal[1]

// mois - 1 car la fonction prends des mois de 0 a 11
var LeverSoleil = new Date(
  annee,
  mois - 1,
  jour,
  parseInt(SunCal[mois][2].substring(0, 2)),
  parseInt(SunCal[mois][2].substring(2, 4)),
  parseInt(SunCal[mois][2].substring(4, 6))
);
var CoucherSoleil = new Date(
  annee,
  mois - 1,
  jour,
  parseInt(SunCal[mois][3].substring(0, 2)),
  parseInt(SunCal[mois][3].substring(2, 4)),
  parseInt(SunCal[mois][3].substring(4, 6))
);

if (jour < 21) {
  var mois2 = mois - 1;
} else {
  var mois2 = mois + 1;
}
if (mois2 == 13) {
  mois2 = 1;
}
if (mois2 === 0) {
  mois2 = 12;
}

//var LeverSoleil2 = new Date(annee, mois2-1, jour, parseInt(SunCal[mois2][2].substring(0,2)), parseInt(SunCal[mois2][2].substring(2,4)), parseInt(SunCal[mois2][2].substring(4,6)));
//var CoucherSoleil2 = new Date(annee, mois2-1, jour, parseInt(SunCal[mois2][3].substring(0,2)), parseInt(SunCal[mois2][3].substring(2,4)), parseInt(SunCal[mois2][3].substring(4,6)));

var dateNow = timeNow.getTime();
var millidate = SnSrSimul.timestamp; //SimulIdx[0];

if (hours < 6 || hours > 18) {
  conso = ((dateNow - millidate) / 1000) * rand;
} //1 Wh pour 10s la nuit
else {
  conso = ((dateNow - millidate) / 1000) * 0.28 * (rand + rand1);
} // moyenne de + 1,4 Wh / 10s le jour

//***** PRODUCTION enveloppe pour un jour type
// centrÃ©s sur 13h00, prodmoy (CS=1, jour de 12h) et prodmax (CS = Pprod en kWc, jour de 14h)
//A vÃ©rifier : decalage horaire avec GMT ??
var prodmoy = Math.max(
  ((dateNow - millidate) / (1000 * 60 * 60)) *
    ((((puis / 2) * puis * 1000) / 2.3955) *
      (-1 * Math.pow(((hours * 60 + minutes) / 60 - 13) / 7, 2) + 1)),
  0
);
var prodmax = Math.max(
  ((dateNow - millidate) / (1000 * 60 * 60)) *
    (((puis * puis * 1000) / 2.3955) *
      (-1 * Math.pow(((hours * 60 + minutes) / 60 - 13) / 7, 2) + 1)),
  0
);

//*****FORMULE ADAPTEE AU PROFIL ENEDIS => PRENDS EN COMPTE SunCal
// Interpolation linÃ©aire approximative entre 2 dates pour former le graphique

var CS = SunCal[mois][4];
var CS2 = SunCal[mois2][4];

CS =
  CS +
  ((21 - jour) * (CS - CS2)) / Math.abs(SunCal[mois2][0] - SunCal[mois][0]);

//17Avril2019 timeNow.getTime
var Jour100 = Math.round(
  (100 * (timeNow.getTime() - LeverSoleil.getTime())) /
    (CoucherSoleil.getTime() - LeverSoleil.getTime())
);
var parabole = 1 + -1 * Math.pow((Jour100 - 50) / 50, 2); // parabole <0 LA NUIT avant et aprÃ¨s le coucher du soleil
var facteurX = 3047.380505; //facteur  arbitraire sans unitÃ© calculÃ© Ã  partir de la prod moyenne d'une journee

var facteurP = (puis * productible * facteurX) / (365 * 24); // facteur de puissance sans unitÃ©
var DeltaT = (dateNow - millidate) / (1000 * 60 * 60); //durÃ©e en fraction d'heure pour calculer des kWh par la suite => vaut env. 4000/(1000*60*60) Ã  15000/(1000*60*60)
prod = Math.max(DeltaT * facteurP * parabole * CS, 0); // 0 avant et aprÃ¨s le coucher du soleil car parabole <0 la nuit

//evacuer les valeur abÃ©rentes (inititalisation);
if (Math.abs(prod) > membre.Pprod * 1000) {
  prod = 0;
  soutir = 0;
  inject = 0;
  conso = 0;
}
if (Math.abs(soutir) > membre.Psoutir * 1000) {
  prod = 0;
  soutir = 0;
  inject = 0;
  conso = 0;
}
if (Math.abs(inject) > membre.Pprod * 1000) {
  prod = 0;
  soutir = 0;
  inject = 0;
  conso = 0;
}
if (Math.abs(conso) > membre.Psoutir * 1000) {
  prod = 0;
  soutir = 0;
  inject = 0;
  conso = 0;
}

// Calcul des variables de la courbe Ã  afficher

if (prod <= 0) {
  // LA NUIT
  prod = 0;
  autoconso = 0;
  inject = 0;
  soutir = conso;
} else {
  if (prod < conso) {
    soutir = conso - prod;
    inject = 0;
    autoconso = prod;
  } // prod > conso CAS GENERAL
  else {
    soutir = 0;
    autoconso = conso;
    inject = prod - conso;
  }
}

var soutirW =
  Math.round(
    1000 * 60 * 60 * (soutir / (timeNow.getTime() - SnSrSimul.timestamp))
  ) || 0; // en W (Puissance moyenne sur laperiode)
var injectW =
  Math.round(
    1000 * 60 * 60 * (inject / (timeNow.getTime() - SnSrSimul.timestamp))
  ) || 0; // en W (Puissance moyenne sur laperiode)
var prodW =
  Math.round(
    1000 * 60 * 60 * (prod / (timeNow.getTime() - SnSrSimul.timestamp))
  ) || 0; // en W (Puissance moyenne sur laperiode)
var autoconsoW =
  Math.round(
    1000 * 60 * 60 * (autoconso / (timeNow.getTime() - SnSrSimul.timestamp))
  ) || 0; // en W (Puissance moyenne sur laperiode)
var consoW =
  Math.round(
    1000 * 60 * 60 * (conso / (timeNow.getTime() - SnSrSimul.timestamp))
  ) || 0; // en W (Puissance moyenne sur laperiode)

SnSrSimul.timestamp = timeNow.getTime();
SnSrSimul.time = timeNow;
SnSrSimul.soutiridx = SnSrSimul.soutiridx + soutir;
SnSrSimul.injectidx = SnSrSimul.injectidx + inject;
SnSrSimul.prodidx = SnSrSimul.prodidx + prod;
SnSrSimul.autoconsoidx = SnSrSimul.autoconsoidx + autoconso;
SnSrSimul.prodmoyidx = SnSrSimul.prodmoyidx + prodmoy;
SnSrSimul.prodmaxidx = SnSrSimul.prodmaxidx + prodmax;

var msg8 = {};
msg8.payload = [
  //format d'objet pour intÃ©gration de la mesure Ã  une base InfluDB sur un Raspberry Pi via NodeRed - node InfluxDB_batch
  {
    measurement: 'raspiSunshare', //capteur ou site de la mesure ou id du raspberry / du capteur
    fields: {
      inject: injectW, //en W, injection (surplus) vers le rÃ©seau ENEDIS mesurÃ© par LINKY
      soutir: soutirW, //en W, soutirage du rÃ©seau ENEDIS mesurÃ© par LINKY
      prod: prodW, //en W, production photovoltaique mesurÃ©e par un compteur Ã  impulsion de l'onduleur
      autoconso: autoconsoW, //en W, autoconsommation calculÃ©e par diffÃ©rence autoconso =  prod - inject
      inj_sout: injectW - soutirW, //en W, rÃ©sultante inject-soutir vue du site (le soutirage apparait nÃ©gatif)
      consoCALC: consoW, //en W, consommation totale calculÃ© par somme : prod - inject ou soutir selon prod >0 ou prod = 0
      consoIMP: null //en W, consommation mesurÃ©e par un compteur Ã  impulsion dans le tableau Ã©lectrique
    },
    tags: { pseudo: membre.peudo, timestamp: timeNow.getTime().toString() }, //pseudo de l'utilisateur, rÃ©fÃ©rence du compteur
    timestamp: timeNow.getTime() //timestamp du LINKY, en millisec !! le LINKY est a l'heure FRANCAISE
  }
];

//METTRE A JOUR LA VARIABLE GLOBALE
flow.set('SnSrSimul', SnSrSimul);

var msg2 = {};
//msg2 dÃ©clenche le noeud suivant (simule le signale tÃ©lÃ©info LINKY)
msg2.SnSrSimul = SnSrSimul;
msg2.payload = 'SIMUL';
msg2.count = SnSrSimul.prodidx;
msg2.tab = [
  msg.timenow,
  soutir,
  inject,
  prod,
  autoconso,
  timeNow,
  conso,
  DeltaT,
  facteurP,
  parabole
];
msg2.timenow = msg.timenow;

var m3 = [
  { topic: 'inject', payload: injectW },
  { topic: 'soutir', payload: soutirW },
  { topic: 'autoconso', payload: -1 * autoconsoW }
];

var m4 = [
  { topic: 'prod', payload: prodW },
  { topic: 'conso', payload: consoW }
];

return [msg2, msg8, m3, m4];
