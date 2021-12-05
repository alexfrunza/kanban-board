export const inputCleanUp = (inputName) => {
    const input = document.querySelector(`[name='${inputName}']`);
    input.value = "";
    input.select();
    input.focus();
};

export const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNickname");
    localStorage.removeItem("userAdmin");
};
