

// update quantity in cart
const inputs = document.querySelectorAll("[item-id");
inputs.forEach((input) => {
    input.addEventListener("change", async (e) => {
        const id = e.target.getAttribute("item-id");
        const quantity = e.target.value;

        window.location.href = `/cart/update/${id}/${quantity}`;
    });
});