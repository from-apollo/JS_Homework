var container = document.getElementById('container');

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML = 'Hello, here are <a href="https://www.facebook.com">Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

var buttons = document.getElementsByTagName('button'),
    button = buttons[0];

var links = container.children;

var link = links[0].getElementsByTagName('a');

var a = link[0],
    b = link[1];

for (var i = 0; i < paragraphs.length; i++) {
    buttons[i].onclick = function() {

        a.style.color = 'red';
        b.style.color = 'red';
    };
}

var link1 = links[1].getElementsByTagName('a')[0],
    link2 = links[1].getElementsByTagName('a')[1];

link1.addEventListener('click', function(evt) {
    evt.preventDefault();

    link1.style.color = 'red';
    alert(link1);
});

link2.addEventListener('click', function(evt) {
    evt.preventDefault();

    link2.style.color = 'red';
    alert(link2);
});

