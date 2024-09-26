// client send msg
const formTextbox = document.querySelector(".chat .inner-form");
if (formTextbox) {
    formTextbox.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.querySelector(".chat .inner-form input");
        const msg = input.value;

        if (msg) {
            socket.emit("CLIENT_SEND_MSG", msg);
            input.value = '';
        }
    });
}
// end client send msg


//listen server return msg
socket.on("SERVER_RETURN_MSG", (data) => {
    const div = document.createElement("div");

    //who is on this screen
    const user_id = document.querySelector(".chat").getAttribute("my-id");

    if (data.user_id == user_id) {
        div.classList.add("inner-outgoing");
        div.innerHTML =
            `<div class="inner-message">${data.message}</div>`;
    }
    else {
        div.classList.add("inner-incoming");
        div.innerHTML = `
                <div class="inner-name" > ${data.senderFullname}</div>
                <div class="inner-message">${data.message}</div>`;
    }
    const parent = document.querySelector(".chat .inner-body");
    parent.appendChild(div);
    //scroll chat to the end
    parent.scrollTop = parent.scrollHeight;
});

