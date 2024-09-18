// add action for delete role btn
const deleteBtn = document.querySelectorAll('#btn-delete-role');
if (deleteBtn.length !== 0) {
    let deleteForm = document.querySelector('#delete-form');
    let path = deleteForm.getAttribute('data-path');

    deleteBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {

            const isConfirm = confirm('Are you sure you want to delete this role?');
            if (isConfirm) {
                event.preventDefault();
                let id = btn.getAttribute('role-id');
                let action = path + `/${id}?_method=DELETE`;
                deleteForm.setAttribute('action', action);
                deleteForm.submit();
            }
        });
    });
}

