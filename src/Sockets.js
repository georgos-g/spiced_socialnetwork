import { chatMessages, chatMessage } from "./actions.js";

import * as io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (messages) => {
            store.dispatch(chatMessages(messages));
        });

        socket.on("chatMessage", (message) => {
            store.dispatch(chatMessage(message));
        });
    }
};
