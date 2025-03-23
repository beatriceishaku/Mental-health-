import React, { useState } from "react";
import axios from "axios";

const YoutubeVideos = () => {
    const [query, setQuery] = useState("");
    const [videos, setVideos] = useState([]);

    const searchVideos = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/youtube?query=${query}`);
        setVideos(response.data.videos);
    };

    return (
        <div style={{ width: "50%", margin: "auto", textAlign: "center", padding: "20px" }}>
            <h2>YouTube Video Suggestions</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "80%", padding: "10px" }}
            />
            <button onClick={searchVideos} style={{ padding: "10px", marginLeft: "10px" }}>Search</button>
            <ul>
                {videos.map((video, i) => (
                    <li key={i}>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YoutubeVideos;
