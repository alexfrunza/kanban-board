import { atom } from "recoil";

export const warningMessageState = atom({
    key: "warningMessageState",
    default: "",
});

export const jsonWebTokenState = atom({
    key: "jsonWebTokenState",
    default: "",
});

export const currentUserState = atom({
    key: "currentUserState",
    default: {},
});
