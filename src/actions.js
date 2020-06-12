export function remove(value) {
    return {
        type : "REMOVE",
        value
    }
}

export function add(value) {
    return {
        type : "ADD",
        value
    }
}

export function undo(value) {
    return {
        type: "UNDO",
        value
    }
}

export function redo(value) {
    return {
        type: "REDO",
        value
    }
}

export function save(value) {
    return{
        type: "SAVE",
        value
    }
}