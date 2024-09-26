var socket = io();

const message = document.getElementById('messages');
socket.on('msg from server', function (msg) {
    const li = document.createElement('li');
    li.textContent = msg;
    message.appendChild(li);
});

const form = document.querySelector('form');
const input = document.querySelector('#input');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('msg from client', input.value);
        input.value = '';
    }
});