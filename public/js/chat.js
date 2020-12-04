
const socket = io()
const input = document.querySelector('#message')
const form = document.getElementById("form");
const sendButton = form.querySelector('button')
const locationButton = document.querySelector('#location')

socket.on('message', ({ message }) => {
  console.log(message)
})

socket.on('sendLocation', ({ position }) => {
  console.log(position)
})

const sendMessage = (e) => {
  e.preventDefault()
  const message = input.value;
  sendButton.setAttribute('disabled', 'disabled')
  socket.emit('message', { message }, (error) => {
    console.log('message was delivered , server ackolwdged')
    sendButton.removeAttribute('disabled')
    input.focus()
    if (error) {
      return console.log(error)
    }
  })
  input.value = ""
}

const shareLocation = (e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', { position }, (ack) => {
      console.log(ack)
    });
  })
}


sendButton.addEventListener('click', sendMessage)
locationButton.addEventListener('click', shareLocation)