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


// search form
const searchForm = document.querySelector("#searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let url = new URL(window.location.href);
        const keyword = event.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);

        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
// end search form

// pagination
const btnPagination = document.querySelectorAll('.page-link');

if (btnPagination.length !== 0) {
    btnPagination.forEach(btn => {
        btn.addEventListener("click", (event) => {

            event.preventDefault();
            let url = new URL(window.location.href);
            const page = btn.getAttribute("button-pagination");

            if (page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        });
    });
}
// end pagination


// alert message
//show
const alertMessage = document.querySelector("#alert-popup");
if (alertMessage) {
    let timeout = alertMessage.getAttribute("timeout");
    console.log(alertMessage);
    setTimeout(() => {
        alertMessage.classList.add("alert-hidden");
    }, timeout);
}
//close
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert) {
    closeAlert.addEventListener("click", () => {
        alertMessage.classList.add("alert-hidden");
    });
}
// end alert message