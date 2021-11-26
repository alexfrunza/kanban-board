import { atom, selector } from "recoil";

export const cardEditModalState = atom({
    key: "cardEditModalState",
    default: false,
});

export const numberOfCurrentColumnState = atom({
    key: "numberOfCurrentColumnState",
    default: 0,
});

export const columnsState = atom({
    key: "columnsState",
    default: [],
});

export const currentColumnState = selector({
    key: "currentColumnState",
    get: ({ get }) => {
        const columns = get(columnsState);
        const numberOfCurrentColumn = get(numberOfCurrentColumnState);

        return columns[numberOfCurrentColumn];
    },
});

export const editedCardState = atom({
    key: "editedCardState",
    default: {},
});
