import React, { useState } from "react";
import "./Home.scss";

const Home = () => {

    const [roomId, setRoomId] = useState("");

    const changeRoomId = (NewId) => {
        setRoomId(NewId);
    }

    return (
        <div className="Home">
            <div class="card">
                <h5 class="card-header">Welcome to the game!!</h5>
                <div class="card-body">
                    <h5 class="card-title">Ready?</h5>
                    <p class="card-text">Create a code or enter in an existing one</p>
                    <div className="row">
                        <input
                            type="text"
                            placeholder="Room"
                            value={roomId}
                            onChange={(e) => changeRoomId(e.target.value)}
                        />
                    </div>
                    <div className="row justify-content-center">
                      <a href={`/${roomId}`} class="btn btn-primary">Join room</a>  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;