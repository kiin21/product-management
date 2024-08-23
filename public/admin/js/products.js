// change product's status 
const statusBtn = document.querySelectorAll('[btn-change-status]');

if (statusBtn.length !== 0) {

    let changeStatusForm = document.querySelector("#change-status-form");
    let path = changeStatusForm.getAttribute('data-path');

    statusBtn.forEach(btn => {
        btn.addEventListener("click", (event) => {
            let status = btn.getAttribute("product-status");
            let changedStatus = status === "available" ? "unavailable" : "available";

            let id = btn.getAttribute("product-id");

            let action = path + `/${changedStatus}/${id}?_method=PATCH`;

            console.log(action);

            changeStatusForm.setAttribute("action", action);
            changeStatusForm.submit();
        });
    });
}
// end change product's status 