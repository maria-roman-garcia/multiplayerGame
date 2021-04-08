const RECEIVED_PLAYER_COMMANDS = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  CREATE_MATCH: "create_match",
  JOIN_MATCH: "join_match",
};

const EMITTED_PLAYER_COMMANDS = {
  SEND_MATCH_ID: "send_match_id",
  SEND_PLAYER_JOINED: "player_joined",
};

module.exports = { RECEIVED_PLAYER_COMMANDS, EMITTED_PLAYER_COMMANDS };
