// change product's status 
const statusBtn = document.querySelectorAll('[btn-change-status]');
if (statusBtn.length !== 0) {

    let changeStatusForm = document.querySelector("#change-status-form");
    let path = changeStatusForm.getAttribute('data-path');

    statusBtn.forEach(btn => {
        btn.addEventListener("click", (event) => {
            let status = btn.getAttribute("category-status");
            let changedStatus = status === "available" ? "unavailable" : "available";

            let id = btn.getAttribute("item-id");
            let action = path + `/${changedStatus}/${id}?_method=PATCH`;

            changeStatusForm.setAttribute("action", action);
            changeStatusForm.submit();
        });
    });
}
// end change product's status 


// add action for delete btn
const deleteBtn = document.querySelectorAll('#btn-delete');
if (deleteBtn.length !== 0) {
    let deleteForm = document.querySelector('#delete-form');
    let path = deleteForm.getAttribute('data-path');

    deleteBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {

            const isConfirm = confirm('Are you sure you want to delete this category?');
            if (isConfirm) {
                event.preventDefault();
                let id = btn.getAttribute('product-id');
                let action = path + `/${id}?_method=DELETE`;
                deleteForm.setAttribute('action', action);
                deleteForm.submit();
            }
        });
    });
}
