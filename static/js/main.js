import Cloudlink from "./lib/cloudlink.js";
import handleCommand from "./lib/commandHandler.js";

// Cloudlink callback functions
function onConnect() {
    setInterval(() => { cl.send({ cmd: "ping", val: "" }); console.log("ping"); }, 10000);
    cl.send({"cmd": "direct", "val": "meower", "listener": "trust"});
    console.log("Connected!");
}

function onDisconnect() {
    console.log("Disconnected, reload to reconnect");
}

function onError(error) {
    console.log(`An error occured: ${JSON.stringify(error)}`);
}

function onDirect(cmd) {
    console.log(`%cINCOMING: ${JSON.stringify(cmd)}`, "color: gray; font-style: italic");

    if (cmd["cmd"] == "direct") {
        handleCommand(cmd["val"]);
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("pswd").value;
    // console.log(`Username: ${username}\nPassword: ${password}`);

    cl.send({"cmd": "direct", "val": {"cmd": "authpswd", "val": {"username": username, "pswd": password}}});
    document.getElementById("loginscreen").outerHTML = "";
}

function makepost() {
    let post = document.getElementById("postTextInput").value;
    cl.send({"cmd": "direct", "val": {"cmd": "post_home", "val": post}});
    document.getElementById("postTextInput").value = "";
}

const cl = new Cloudlink("wss://server.meower.org/");
cl.on("connected", onConnect);
cl.on("disconnected", onDisconnect);
cl.on("error", onError);
cl.on("direct", onDirect);

// Event listeners (might change later)
document.getElementById("loginbutton").addEventListener("click", login);
document.getElementById("postTextInput").addEventListener("keypress", (element) => { if (element.key == "Enter") { makepost(); } });
document.getElementById("postSubmit").addEventListener("click", makepost);