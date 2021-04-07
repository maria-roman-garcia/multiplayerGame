import { RECEIVED_PLAYER_COMMANDS, EMITTED_PLAYER_COMMANDS } from "./protocol/player/commands";
import { Player } from "./game/Player"; 
import { GameMatch } from "./game/GameMatch";

var http = require('http');
var server = http.createServer();
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const PORT = 4000;

const players = new Map();
const games = new Map();

io.on(RECEIVED_PLAYER_COMMANDS.CONNECT, (socket) => {
    const { userName } = socket.handshake.query;

    const player = new Player(userName);
    players.set(player.id, player);

    socket.on(RECEIVED_PLAYER_COMMANDS.CREATE_MATCH, (data) => {
        const game = new GameMatch(player);
        games.set(game.gameMatchId, game);
        socket.emit(EMITTED_PLAYER_COMMANDS.SEND_MATCH_ID, JSON.stringify({matchID: game.gameMatchId}));
        socket.join(game.gameMatchId);
    });

    socket.on(RECEIVED_PLAYER_COMMANDS.JOIN_MATCH, (data) => {
        if(games.has(data.matchID)) {
            const game = games.get(data.matchID);
            game.joinPlayer(player);
            games.set(game.gameMatchId, game);
            socket.join(game.gameMatchId);
            socket.in(game.gameMatchId).emit(EMITTED_PLAYER_COMMANDS.SEND_PLAYER_JOINED, JSON.stringify({matchID: game.gameMatchId}))
        }
    });

    // Leave the room if the user closes the socket
    socket.on(RECEIVED_PLAYER_COMMANDS.DISCONNECT, () => {
        players.delete(player.id);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});