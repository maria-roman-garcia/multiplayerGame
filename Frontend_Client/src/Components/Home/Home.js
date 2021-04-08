import React, { useState, useRef, useEffect } from "react";
import "./Home.scss";
import socketIOClient from "socket.io-client";

const CREATE_MATCH = "create_match"; // Name of the event
const JOIN_MATCH = "join_match";
const SOCKET_SERVER_URL = "http://localhost:4000";

const Home = () => {

    const [tabItemSelected, setTabItemSelected] = useState(0);
    const [player1Name, setPlayer1Name] = useState("");
    const [existingRoom, setExistingRoom] = useState("");
    const [newMatchId, setNewMatchId] = useState(undefined);
    const socketRef = useRef();

    useEffect(() => {

        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { player1Name },
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [player1Name]);


    const tabItems = [
        {
            id: 0,
            title: "Create a game room"
        },
        {
            id: 1,
            title: "Join a game room"
        }
    ];

    const createMatch=()=>{
        socketRef.current.emit(CREATE_MATCH, (matchId) => {
            setNewMatchId(matchId);
        });
    }

    const joinMatch=()=>{
        socketRef.current.on(JOIN_MATCH, (matchId) => {
            setNewMatchId(matchId);
        });
    }

    return (
        <div className="Home">
            <div className="tabContainer">
                <ul className="nav nav-tabs">
                    {tabItems.map(item =>
                        <li className="nav-item" key={`tabItem_${item.id}`} onClick={() => setTabItemSelected(item.id)}>
                            <a className={item.id === tabItemSelected ? "nav-link active" : "nav-link"} href="#">{item.title}</a>
                        </li>
                    )}
                </ul>
                <div className="tabInfoSelected">
                    {tabItemSelected === 0
                        ? <div> {/* Create a game room */}
                            <label>Player name:</label>
                            <input
                                value={player1Name}
                                onChange={(e) => setPlayer1Name(e.target.value)} />
                            <div class="d-grid gap-2" onClick={createMatch}>
                                <button type="button" class="btn btn-dark">Create room!</button>
                            </div>
                            {newMatchId !== undefined && <p>{newMatchId}</p>}
                        </div>
                        : <div> {/* Join a game room */}
                            <label>Room id:</label>
                            <input
                                value={existingRoom}
                                onChange={(e) => setExistingRoom(e.target.value)} />
                            <div class="d-grid gap-2" onClick={joinMatch}>
                                <button type="button" class="btn btn-dark">Join room!</button>
                            </div>
                        </div>}
                </div>
            </div>
            {/* Background animation */}
            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
        </div>
    )
}

export default Home;