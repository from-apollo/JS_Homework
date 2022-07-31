var button = document.getElementsByTagName('button')[0];

var inputX = document.getElementById('x');

var inputY = document.getElementById('y');

button.setAttribute('disabled', 'disabled');

function checkedForm() {

    if (inputX.value !== '' && inputY.value !== '') {

        button.removeAttribute('disabled');  
    } else {
        button.setAttribute('disabled', 'disabled');
    }
}

inputX.addEventListener('keyup', checkedForm);
inputY.addEventListener('keyup', checkedForm);

button.addEventListener('click', createTable);

function createTable() {

        var table = document.createElement('table');

        var tbody = document.createElement('tbody');
        
        table.appendChild(tbody);

        var board = document.getElementsByTagName('table')[0];

        if (board) {

            board.remove();

        }

        var valX = Number(document.getElementById('x').value);

        var valY = Number(document.getElementById('y').value);

        if((valY > 0 && valY <= 10) && (valX > 0 && valX <= 10)) {

            for (var i = 1; i <= valY; i++) {

                var y = document.createElement('tr');

                for (var j = 1; j <= valX; j++) {

                    var x = document.createElement('td');

                    if (i%2 === j%2) {

                        x.classList.add('white');

                    } else {

                        x.classList.add('black');

                    }

                    y.appendChild(x);
                }

                tbody.appendChild(y);
            } 
        } else {

            button.setAttribute('disabled', 'disabled')

            alert('Неверные данные!');

            board.remove();

        } 

        document.body.appendChild(table);

        table.addEventListener('click', function(evt) {
    
            var target = evt.target;
        
            if (target.tagName === 'TD') {
        
                var cell = document.getElementsByTagName('td');
        
                for (var i = 0; i < cell.length; i++) {
        
                    if (target.classList.contains('white')) {
        
                        cell[i].classList.toggle('white');
        
                        cell[i].classList.toggle('black');
        
                    } else if (target.classList.contains('black')) {
        
                        cell[i].classList.toggle('black');
        
                        cell[i].classList.toggle('white');
        
                    }
                }
            }
        })
}
