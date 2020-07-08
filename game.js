var checkRow = (row) => {
  var lastFound = '';
  var $row = $('.row' + row);
  for (var i = 0; i < 3; i ++) {
    var $td = $($row.children()[i]);
    var text = $td.text().replace(' ', '');
    if (i > 0 && (text != lastFound)) {
      return '';
    }
    
    lastFound = text;
  }

  //return the victor
  return lastFound;
}

var checkCol = (col) => {
  var lastFound = '';
  for (var row = 0; row < 3; row ++) {
    var $row = $('.row' + row);
    var $td = $($row.children()[col]);

    var text = $td.text().replace(' ', '');
    if (row > 0 && (text != lastFound)) {
      return '';
    }
    lastFound = text;
  }
  return lastFound;
}

var checkDiag1 = () => {
  var lastFound = '';
  for (var i =0; i < 3; i ++) {
    var $row = $('.row' + i);
    var $td = $($row.children()[i]);

    var text = $td.text().replace(' ', '');
    if (i > 0 && (text != lastFound)) {
      return '';
    }
    lastFound = text;
  }
  return lastFound;
}

var checkDiag2 = () => {
  var lastFound = '';
  for (var i =0; i < 3; i ++) {
    var $row = $('.row' + i);
    var $td = $($row.children()[2-i]);

    var text = $td.text().replace(' ', '');
    if (i > 0 && (text != lastFound)) {
      return '';
    }
    lastFound = text;
  }
  return lastFound;
}



var checkWin = () => {
  //first check rows/cols
  for (var i = 0; i < 3; i++ ){
    var rowWin = checkRow(i);
    if (rowWin) {
      return rowWin;
    }
    var colWin = checkCol(i);
    if (colWin) {
      return colWin;
    }
  }
  return checkDiag1() || checkDiag2();
}




var makeMove = (event) => {
  var $td = $(event.target);

  //check if empty position
  if($td.text().replace(' ', '').length) {
    return;
  }

  var col = $td.index();
  var row = $td.parent().index();


  var move = 'x';
  var $currPlayer = $('.curr-player');
  var oldText = $currPlayer.text();
  if (oldText.endsWith('2')) {
    move = 'o';
  }
  $td.text(move);

  var win = checkWin();
  if (win) {
    $currPlayer.text(oldText + ' Wins!');
    //end the game somehow so users can't press inputs
    return;
  }

  if (move === 'x') {
    $currPlayer.text('Player 2');
  } else {
    $currPlayer.text('Player 1');
  }
}


$(document).ready( () => {
  var $td = $('td');
  $td.click( makeMove );
});
