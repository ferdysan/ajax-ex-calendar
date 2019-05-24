// Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018 dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività. Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
//
// Ogni volta che cambio mese dovrò: 1. Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018) 2. Controllare quanti giorni ha il mese scelto formando così una lista

$(document).ready(function(){


  var template_html = $('#template-calendario').html();
  var template_function = Handlebars.compile(template_html);

  // tramite moment js inserisco una variabile con il formato data adatto
  var min_date='2018-01-01';
  var max_date= '2018-12-01';

    var inizial_date='2018-01-01';
    // in un altra varaibile passo al metodo moment la variabile date
    var current_date = moment(inizial_date);
    disegna_mese(current_date);

   // intercetto il click sul mese successivo
    $('#mese-successivo').click(function(){

      if (current_date.isSameOrAfter(max_date)) {
        alert('data oltre il limite max');
        $(this).attr('disable', true);
      }else{
        current_date.add(1 , 'months');
        disegna_mese(current_date);
        $(this).attr('disable', false);
      }
    });

    $('#mese-precedente').click(function(){

      if (current_date.isSameOrBefore(min_date)) {
        alert('data oltre il limite min');
        $(this).attr('disable', true);
      }else{
        current_date.subtract(1 , 'months');
        disegna_mese(current_date);
      }
    });


  //  funzione che mi disegna il mese
    function disegna_mese(moment_date){
      // resetto il contenitore
      $('#calendario').empty();
      // leggo quanti giorni ci sono nel mese corrente
      var giorni = moment_date.daysInMonth();

       // preparo le variabili da utilizzare nel display del mese
      var mese = moment_date.format('MMMM');
      var anno = moment_date.format('YYYY');

      // inserisoc nel titolo il mese corrente
      $('#mese_corrente').text(mese + ' ' + anno);

      //scorro la variabile giorni che contiene un numero
      //parto da 1
      for (var i = 1; i <= giorni; i++) {
        var giorno = i + ' ' + mese;
        var variables ={
          'giorno_template':giorno
          'data-giorno_iso':moment_date.format('YYYY-MM-')+ format_day(i);
        }
        $('#calendario').append(template_function(variables));
      }
    }

   // funzione che mi aggiunge lo 0 davanti a numeri singoli
    function format_day(day){
      if(day<10){
        return '0' + day
      }
      return day;
    }


  });
