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

// change multi product's status
const checkboxMulti = document.getElementById('check-multi');
if (checkboxMulti) {
    const checkAllBox = checkboxMulti.querySelector('input[id="check-all"]');
    const checkboxes = checkboxMulti.querySelectorAll('input[id="check-item"]');

    checkAllBox.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = checkAllBox.checked;
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            let isAllChecked = true;
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    isAllChecked = false;
                }
            });
            checkAllBox.checked = isAllChecked;
        });
    });
}
// end change multi product's status

// form change multi status
const formChangeMultiStatus = document.querySelector("#change-multi-form");
if (formChangeMultiStatus) {
    formChangeMultiStatus.addEventListener("submit", (event) => {
        event.preventDefault();
        const checkMulti = document.querySelectorAll('input[id="check-item"]:checked');

        if (checkMulti.length === 0) {
            alert("Please select at least one product");
            return;
        }
        else {
            let IDs = [];
            checkMulti.forEach(checkbox => {
                IDs.push(checkbox.value);
            });

            const formIds = document.querySelector('input[name="IDs"]');

            formIds.value = IDs.join(', ');

            formChangeMultiStatus.submit();
        }

    });
}
// end form change multi status