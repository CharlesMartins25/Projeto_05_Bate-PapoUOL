

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

function hidePrivateMessages (answer){
    if (answer.to === "Todos") {
        return true;
    }
    if (answer.type === "private_message" && (answer.from === insertName.name || answer.to === insertName.name)){
        return true;
    }
    if (answer.type === "status" || answer.type === "message"){
        return true;
    }
    return false;


}
function searchMessages (){
const promise =  axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promise.then(listMessages)
}
function listMessages (element){
const messageDistribution = document.querySelector(".messages")
messageDistribution.innerHTML = "";
for (let i = 0; i < element.data.length; i++){
    const answer = element.data[i];
    if (answer.type === "status"){
        messageDistribution.innerHTML += `
        <li class="connection-status">
        <span class="message-time">(${answer.time})</span>
        <strong>&nbsp${answer.from}&nbsp</strong>
        <span>&nbsp${answer.text}&nbsp</span>
        </li>
        `;
        
    }
    else if(answer.type === "message" ){
        messageDistribution.innerHTML += `
        <li class="public-message">
        <span class="message-time">(${answer.time})</span>
        <strong> ${answer.from} </strong>
        <span>&nbsppara&nbsp</span>
        <strong>&nbsp${answer.to}:&nbsp</strong>
        <span>&nbsp${answer.text}&nbsp</span>
        </li>
        `;


    }
    else if (hidePrivateMessages(answer)){
        messageDistribution.innerHTML += `
        <li class="private-messages">
        <span class="message-time">(${answer.time})</span>
        <strong>&nbsp${answer.from}&nbsp</strong>
        <span>&nbspreservadamente para&nbsp</span>
        <strong>&nbsp${answer.to}:&nbsp</strong>
        <span>&nbsp${answer.text}&nbsp</span>
        </li>
        `;
    }
}
showMessages();

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


function showMessages (){
    const containerMessages = document.querySelector(".messages");
    containerMessages.lastElementChild.scrollIntoView();
}