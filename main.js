// / Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018 dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività. Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
// //
// // Ogni volta che cambio mese dovrò: 1. Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018) 2. Controllare quanti giorni ha il mese scelto formando così una lista


$(document).ready(function(){

  // salvo il mio template in una variabile
  var template_html = $('#template-calendario').html();
  // passo al metodo compile di handlebars  il mio template html
  var template_fucntion = Handlebars.compile(template_html);

  // definisco un range massimo e minimo in cui il mio mio calendario può trovarsi

  var data_min = '2018-01-01';
  var data_max = '2018-12-01';

  //definisco poi una variabile iniziale con il formato data esatto

  var data_iniziale ='2018-01-01';

  // passo ora la variabile al metodo momentjs
  var current_date = moment(data_iniziale);

  //tramite la funzione crea mese gli passo la data corrente per creare il mese_corrente
  crea_mese(current_date);

  // FUNZIONE CHE MI CREA IL Mese

  function crea_mese(parametro_mese){
    //resetto il contenitore
    $('#calendario').empty();

    // leggo i giorni presenti nel mese mese_corrente
    var giorni= parametro_mese.daysInMonth();

    // preparo quindi le variabili da usare nel display del mese_corrente
    var mese = parametro_mese.format('MMMM');
    var anno = parametro_mese.format('YYYY');
    console.log(mese);
    console.log(anno);
  }




});
