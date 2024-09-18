// permissions
const tablePermissions = document.querySelector('[table-permissions]');
if (tablePermissions) {
    const btnSubmit = document.querySelector('[button-submit]');

    btnSubmit.addEventListener('click', () => {
        let permissions = [];

        const actionsDiv = document.querySelectorAll('[data-name]:not([data-name="id"])');
        const actions = [...actionsDiv].map(action => action.getAttribute('data-name'));

        const id_row = document.querySelectorAll('[input-id]');
        ids = [...id_row].map(id => id.value);

        ids.forEach(id => {
            let rolePermission = [];
            actions.forEach(action => {
                const checkbox = document.querySelector(`tr[data-name="${action}"] input[type="checkbox"][roleId="${id}"]`);
                rolePermission.push({ [action]: checkbox.checked });
            });
            permissions.push({
                id: id,
                permissions: rolePermission
            });

        });

        if (permissions.length > 0) {
            const formChangePermissions = document.querySelector('#form-change-permissions');
            const inputPermissions = document.querySelector('input[name="permissions"]');
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    });
}
// end permissions  