export default function handleCommand(cmd) {
   if (Object.keys(cmd)[0] == "cmd") {
        switch (cmd["cmd"]) {
            case "vers":
                console.log(`Version ${cmd["val"]}`);
                break;

            default:
        }
   } else if (Object.keys(cmd)[0] == "mode") {
        switch (cmd["mode"]) {
            case "auth":
                console.log(`Logged in as ${cmd["payload"]["username"]}`);
                break;
            
            default:
        }
   } else if (Object.keys(cmd)[0] == "type") {
        switch (cmd["type"]) {
            case 1:
                // Post received
                console.log(`Post author: ${cmd["u"]}\nPost content: ${cmd["p"]}`);

                let postDiv = document.createElement("div");
                let postHeader = document.createElement("h3");
                let postContent = document.createElement("p");

                postHeader.appendChild(document.createTextNode(cmd["u"]));
                postContent.appendChild(document.createTextNode(cmd["p"]));
                postDiv.appendChild(postHeader);
                postDiv.appendChild(postContent);
                document.body.insertBefore(postDiv, document.getElementById("makepost"));
                break;
            
            default:
                
        }
   }
}