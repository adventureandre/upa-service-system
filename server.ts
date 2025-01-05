import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 4000 });

wss.on("connection", (ws: WebSocket) => {
    console.log("Cliente conectado");

    ws.on("message", (message: string) => {
        console.log("Mensagem recebida:", message);
    });

    ws.on("close", () => {
        console.log("Cliente desconectado");
    });

    // Enviar uma mensagem de exemplo
    const exampleMessage = {
        type: "status",
        status: "chamado",
        nome: "Cliente exemplo",
    };

    ws.send(JSON.stringify(exampleMessage));
});

console.log("Servidor WebSocket rodando na porta 4000");
