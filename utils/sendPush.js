import fetch from "node-fetch";

export const sendPushNotification = async ({ token, title, body, data }) => {
    if (!token) return;

    const message = {
        to: token,
        sound: "default",
        title,
        body,
        data,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
};
