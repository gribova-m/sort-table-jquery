// Задание 1
// var n = goods.length;
// goods[n - 1];


//  Задание 2
// var arr = [1, 2, 3];

// var arr2 = arr;
// arr2[0] = 5;

// alert( arr[0] );
// alert( arr2[0] );
// в обоих случаях выведеться 5, так как мы создали две ссылки (arr и arr2) на один массив,
// и добраться до массива можно через любую из ссылок


//  Задание 3
// Вариант 1
// function getWeekDay(date) {
// 	var weekDay = date.getDay();
// 	switch(weekDay) {
// 		case 0:
// 		return 'вс';
// 		case 1:
// 		return 'пн';
// 		case 2:
// 		return 'вт';
// 		case 3:
// 		return 'ср';
// 		case 4:
// 		return 'чт';
// 		case 5:
// 		return 'пт';
// 		case 6:
// 		return 'сб';
// 	}
// }
// Вариант 2
// function getWeekDay(date) {
// 	return date.toLocaleString("ru", {weekday: 'short'});
// }

// var date = new Date(2012,0,3);  // 3 января 2012
// alert( getWeekDay(date) );      // Должно вывести 'вт'


// Задание 4
$(document).ready(function () {

  function createTable(json, columns, selector) {  
    var tr = $('<tr/>');

    // цикл для заголовков таблицы
    for (var k = 0; k < columns.length; k++) {
      tr.append("<th>" + columns[k] + "<div class='table-arrow'></div>" + "</th>");
      $(selector).append(tr);
    }

    // цикл для остальных строк
    for (var i = 0; i < json.length; i++) {
      tr = $('<tr/>');

      for (var k = 0; k < columns.length; k++) {
        tr.append("<td>" + json[i][columns[k]] + "</td>");
        $(selector).append(tr);
      }
    }    
  }

  function addSort(selector) {
    $(selector).on('click', 'th', function() {
      var table = $(this).parents('table').eq(0);
      var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));

      $(selector + ' div').removeClass('table-arrow-asc');
      $(selector + ' div').removeClass('table-arrow-desc');

      this.asc = !this.asc;

      if (this.asc) {
        $(this).children('div').addClass('table-arrow-asc');
        $(this).children('div').removeClass('table-arrow-desc');
      } else {
        rows = rows.reverse();
        $(this).children('div').addClass('table-arrow-desc');
        $(this).children('div').removeClass('table-arrow-asc');      
      }

      for (var i = 0; i < rows.length; i++) {
        table.append(rows[i]);
      }
    });
    function comparer(index) {
      return function(a, b) {
        var valA = getCellValue(a, index); 
        var valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
      }
    }
    function getCellValue(row, index) { 
      return $(row).children('td').eq(index).text();
    }
  }

  // Необходимо указать url, массив заколовков таблицы и пользовательский селектор (здесь класс table-client)
  $.getJSON('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
  function (json) {
    createTable(json, ['id', 'firstName', 'lastName', 'email', 'phone'], '.table-client');
    addSort('.table-client');
  })
    .fail(function() {
      alert( "Ошибка загрузки данных" );
    });

});
