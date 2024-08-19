console.log("Hello from script.js");

// Button status
const buttons = document.querySelectorAll("[button-status]");

if (buttons.length > 0) {

    let url = new URL(window.location.href);

    buttons.forEach(button => {
        button.addEventListener("click", async function () {
            let status = button.getAttribute("button-status");


            if (status) {
                url.searchParams.set("status", status);

            } else {
                url.searchParams.delete("status");

            }
            window.location.href = url.href;
        });
    });
}

// End Button status