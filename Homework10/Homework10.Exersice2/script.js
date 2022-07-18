var table = document.getElementById('myTable');

var tbodys = table.getElementsByTagName('tbody'),
    tbody = tbodys[0];

var tr = tbody.getElementsByTagName('tr'),
    trLast = tr[tr.length - 1];

trLast.addEventListener('click', function() {

    trFirst = tr[0];

    var tr1 = document.createElement("tr"), td;
    
    for(var i = 0; i < 3; i++){
        td = document.createElement("td");
        tr1.appendChild(td);
    } 

    tbody.insertBefore(tr1, trFirst);
 
});

var input = document.createElement('input');

table.onclick = function(event) {

    var target = event.target; 
  
    if (target.tagName === 'TD' && target.className !== 'button') {
        target.appendChild(input);
        input.focus();
    }

    input.onfocus = function() {
        var cell = input.parentElement;
        if (cell.textContent.length != 0) {
            input.value = cell.textContent;
        }
    };
};

input.onblur = function() {
    var cell = input.parentElement;
    cell.innerHTML = input.value;
    input.value = '';
}



