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

  // intercetto il click sul mese successivo
  $('#mese-successivo').click(function(){
    if(current_date.isSameOrAfter(data_max)){
      $(this).attr('disable', true);
    }else{
      current_date.add(1, 'months');
      crea_mese(current_date);
    }
  });

  // intercetto il click sul mese precedente
  $('#mese-precedente').click(function(){
    if(current_date.isSameOrBefore(data_min)){
      $(this).attr('disable', true);
    }else{
      current_date.subtract(1, 'months');
      crea_mese(current_date);
    }
  });

  // FUNZIONE CHE MI CREA IL MESE

  function crea_mese(parametro_mese){
    //resetto il contenitore
    $('#calendario').empty();


    // leggo i giorni presenti nel mese mese_corrente
    var giorni= parametro_mese.daysInMonth();

    // preparo quindi le variabili da usare nel display del mese_corrente
    var mese_ajax =parametro_mese.format('M');
    var mese_ajax = mese_ajax - 1;

    var mese = parametro_mese.format('MMMM');
    var anno = parametro_mese.format('YYYY');

    // carico l'api ajax
    $.ajax({
      'url':'https://flynn.boolean.careers/exercises/api/holidays',
      'method': 'GET',
      // passo questo valore tramite la variabile all'api ajax
      'data':{
        'year': '2018',
        'month': mese_ajax
      },
      'success': function(data){
        //mi dichiaro una funzione per portare il response del mio ajax fuori
        var festivita = data.response;

        for (var i = 0; i < festivita.length; i++) {
          var festa = festivita[i];
          $('#calendario li[data-giorno_iso="'+ festa.date+'"]').addClass('festivita');
        }
      },
      'error': function(){
        alert('Inserisci un numero');
      }
    });

    // inserisco nel titolo il mese e l'anno correnti

    $('#mese_corrente').text(mese + ' ' + anno);

    // scorro la variabile giorno_iso
    for(var i =1; i <= giorni; i ++){
      // salvo nella variabile giorno il valore di i + il mese corrente
      var giorno = i + ' ' + mese;
      // definisco le variabili per popolare il mio template_html
      var variabili ={
        'giorno_template':giorno,
        'giorno_iso':parametro_mese.format('YYYY-MM-') + format_day(i)
      }
      // infine faccio l'append delle mie variabili nel template di handlebars
      $('#calendario').append(template_fucntion(variabili));
    }

    // tramite una funzione porto fuori il response della mia api e controllo se ci sono
    // corrispondenze con i giorni

  }

  // definisco una funzione che mi aggiunge uno 0 davanti ai numeri del mese_corrente
  function format_day(giorni){
    if(giorni<10){
      return '0' + giorni
    }
    return giorni
  }

});
