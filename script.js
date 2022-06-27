
let insertName = prompt("Qual o seu nome?");
insertName = {
    name: insertName
}
let connectInTheRoom = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", insertName)
function connection(){
axios.post("https://mock-api.driven.com.br/api/v6/uol/status", insertName);

}
connectInTheRoom.catch(function(){
    insertName.name = prompt("Este nome já está em uso, por favor insira novamente!")
})
const idInterval = setInterval(connection, 4000);
searchMessages()

function searchMessages (){
const promise =  axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promise.then(listMessages)
}
function listMessages (element){
const messageDistribution = document.querySelector(".messages")
messageDistribution.innerHTML = "";
for (let i = 0; i < element.data.length; i++){
    if (element.data[i].type === "status"){
        messageDistribution.innerHTML += `
        <li class="connection-status">
        <span class="message-time">(${element.data[i].time})</span>
        <strong>${element.data[i].from}</strong>
        <span>${element.data[i].text}</span>
        </li>
        `;
        
    }
    else if(element.data[i].type === "message" ){
        messageDistribution.innerHTML += `
        <li class="public-message">
        <span class="message-time">(${element.data[i].time})</span>
        <strong>${element.data[i].from}</strong>
        <span> para </span>
        <strong>${element.data[i].to}:</strong>
        <span>${element.data[i].text}</span>
        </li>
        `;


    }
    else if (element.data[i].type === "private_message"){
        messageDistribution.innerHTML += `
        <li class="private-messages">
        <span class="message-time">(${element.data[i].time})</span>
        <strong>${element.data[i].from}</strong>
        <span> reservadamente para </span>
        <strong>${element.data[i].to}:</strong>
        <span>${element.data[i].text}</span>
        </li>
        `;
    }
}
showMessages();

}

function showMessages (){
    const containerMessages = document.querySelector(".container");
    containerMessages.lastElementChild.scrollIntoView();
}

function sendMessages () {
    const createMessage = document.querySelector(".send-message").value;

    const messageSent = {
        'from': insertName.name,
        'to': 'Todos',
        'text': createMessage,
        'type': 'message'
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", messageSent);
    promise.then(searchMessages);
    promise.catch(function(){
        window.location.reload();
    });
    document.querySelector(".send-message").value = "";
    showMessages();
}
setInterval(searchMessages, 3000);
