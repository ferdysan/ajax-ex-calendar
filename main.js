// Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018 dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività. Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
//
// Ogni volta che cambio mese dovrò: 1. Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018) 2. Controllare quanti giorni ha il mese scelto formando così una lista

$(document).ready(function(){
  // tramite moment js inserisco una variabile con il formato data adatto


 $('#mese-successivo').click(function(){

    var date='2018-01-01';


    // in un altra varaibile passo al metodo moment la variabile date

    var moment_date = moment(date);
    //posso fare un log per provare
    console.log(moment_date);


    //nella libreria moment.js trovo un metodo per trovarmi quanti giorni ha un mese
    var giorni = moment_date.daysInMonth();

    var mese = moment_date.format('MMMM');

    //scorro la variabile giorni che contiene un numero
    //parto da 1

    for (var i = 1; i <= giorni; i++) {
      $('#calendario').append('<li>' + i + ' ' + mese + '</li>');
    }
 });

 $('#mese-precedente').click(function(){
   // tramite moment js inserisco una variabile con il formato data adatto
    var date= '2018-01-01';
    // in un altra varaibile passo al metodo moment la variabile date
    var moment_date = moment(date);
    //posso fare un log per provare


    //nella libreria moment.js trovo un metodo per trovarmi quanti giorni ha un mese
    var giorni = moment_date.daysInMonth();

    var mese = moment_date.format('MMMM');

    //scorro la variabile giorni che contiene un numero
    //parto da 1

    for (var i = 1; i <= giorni; i++) {
      $('#calendario').append('<li>' + i + ' ' + mese + '</li>');
    }
 });

});
