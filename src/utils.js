export const inputCleanUp = (inputName) => {
        const input = document.querySelector(`[name='${inputName}']`);
        input.value = "";
        input.select();
        input.focus();
    };
