var container = document.getElementById('container'),
    button = document.getElementsByTagName('button')[0];

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML = 'Hello, here are <a href="https://www.facebook.com">Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

button.addEventListener('click', btnClick);
function btnClick() {

    var links = firstPar.children;

    for (var i = 0; i < links.length; i++) {
        links[i].classList.add('changed');
    }
}

secondPar.onclick = function(evt) {

    var target = evt.target;

    if (target.tagName === 'A') {
   
     evt.preventDefault();
   
           if (localStorage.getItem(target.innerText) === null) {
   
               localStorage.setItem(target.innerText, JSON.stringify({path: target.getAttribute('href')}));
   
               target.setAttribute('href', '#');
   
               alert('Ссылка сохранена!');
   
           } else {
   
               alert(JSON.parse(localStorage.getItem(target.innerText)).path);
   
           }
   
    }
   
   };

   localStorage.clear();

