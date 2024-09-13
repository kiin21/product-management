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

//preview image when upload
let uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    let uploadImgInput = document.querySelector("[upload-image-input]");
    let uploadImgPreview = document.querySelector("[upload-image-preview]");

    uploadImgInput.addEventListener("change", (e) => {
        let file = e.target.files[0];

        if (file) {
            uploadImgPreview.src = URL.createObjectURL(file);
        }

        let btnClose = document.querySelector("[btn-close-preview-img]");
        btnClose.classList.remove("d-none");
        btnClose.addEventListener("click", () => {
            uploadImgPreview.src = "";
            uploadImgInput.value = "";
            btnClose.classList.add("d-none");
        });
    });

}

//sort
const sort = document.querySelector("[sort]");
if (sort) {
    //sort
    let sortSelect = document.querySelector("[sort-select]");

    // Set the selected option based on URL parameters
    let urlParams = new URLSearchParams(window.location.search);
    let sortkey = urlParams.get("sortkey");
    let sortvalue = urlParams.get("sortvalue");
    if (sortkey && sortvalue) {
        let query = `${sortkey}-${sortvalue}`;
        let selectedOption = sortSelect.querySelector(`option[value="${query}"]`);
        if (selectedOption) {
            selectedOption.selected = true;
        }
    }

    sortSelect.addEventListener("change", (e) => {

        let [sortkey, sortvalue] = e.target.value.split("-");

        let url = new URL(window.location.href);
        url.searchParams.set("sortkey", sortkey);
        url.searchParams.set("sortvalue", sortvalue);

        window.location.href = url.href;
    });

    // clear sort
    let clearBtn = document.querySelector("[sort-clear]");
    clearBtn.addEventListener("click", () => {
        let url = new URL(window.location.href);
        url.searchParams.delete("sortkey");
        url.searchParams.delete("sortvalue");

        window.location.href = url.href;
    });
}
//end sort