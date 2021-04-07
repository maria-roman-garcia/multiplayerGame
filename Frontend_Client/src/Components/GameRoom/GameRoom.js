import React, { useEffect, useRef } from "react";
import "./GameRoom.scss";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const GameRoom = () => {
  // Get the roomId of the url
  const { roomId } = useParams();

  //Canvas ref
  const canvas = useRef();
  const ctx = useRef();
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    //Create canvas
    canvas.current = document.getElementById("canvas");
    ctx.current = canvas.current.getContext("2d");

    //Fill canvas
    ctx.current.fillStyle = "#231f20";
    ctx.current.fillRect(0, 0, canvas.current.width, canvas.current.height);

    // calls gameLoop() function 60 times per second
    // setInterval(gameLoop, 1000 / 60);

    //Paint screen elements
    paint();
  }, []);

  //Objects
  const getBall = (canvas) => {
    return {
      x: canvas.current.width / 2,
      y: canvas.current.height / 2,
      radius: 10,
      velX: 5,
      velY: 5,
      speed: 5,
      color: "#e4e4e4",
    };
  };

  const getUser1 = (canvas) => {
    return {
      x: 0,
      y: (canvas.current.height - 100) / 2,
      width: 10,
      height: 100,
      score: 0,
      color: "#e4e4e4",
    };
  };

  const getUser2 = (canvas) => {
    return {
      x: canvas.current.width - 10,
      y: (canvas.current.height - 100) / 2,
      width: 10,
      height: 100,
      score: 0,
      color: "#e4e4e4",
    };
  };

  const getSeparator = (canvas) => {
    return {
      x: (canvas.current.width - 2) / 2,
      y: 0,
      height: 10,
      width: 2,
      color: "#3a3537",
    };
  };

  //Functions
  function drawRectangle(x, y, w, h, color) {
    ctx.current.fillStyle = color;
    ctx.current.fillRect(x, y, w, h);
  }

  function drawCircle(x, y, r, color) {
    ctx.current.fillStyle = color;
    ctx.current.beginPath();
    ctx.current.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.current.closePath();
    ctx.current.fill();
  }

  function drawScore(text, x, y) {
    ctx.current.fillStyle = "white";
    ctx.current.font = "60px Arial";
    ctx.current.fillText(text, x, y);
  }

  function drawSeparator() {
    for (let i = 0; i <= canvas.current.height; i += 20) {
      drawRectangle(
        getSeparator(canvas).x,
        getSeparator(canvas).y + i,
        getSeparator(canvas).width,
        getSeparator(canvas).height,
        getSeparator(canvas).color
      );
    }
  }

  const paint = () => {
    // drawRectangle(0, 0, canvas.current.width, canvas.current.height, "red");
    drawScore(
      getUser1(canvas).score,
      canvas.current.width / 4,
      canvas.current.height / 5
    );
    drawScore(
      getUser2(canvas).score,
      (3 * canvas.current.width) / 4,
      canvas.current.height / 5
    );
    drawSeparator();
    drawRectangle(
      getUser1(canvas).x,
      getUser1(canvas).y,
      getUser1(canvas).width,
      getUser1(canvas).height,
      getUser1(canvas).color
    );
    drawRectangle(
      getUser2(canvas).x,
      getUser2(canvas).y,
      getUser2(canvas).width,
      getUser2(canvas).height,
      getUser2(canvas).color
    );
    drawCircle(
      getBall(canvas).x,
      getBall(canvas).y,
      getBall(canvas).radius,
      getBall(canvas).color
    );
  };

  return (
    <div className="GameRoom">
      <h1 className="room-name">Room: {roomId}</h1>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
};

export default GameRoom;
