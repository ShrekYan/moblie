import React from "react";
import ReactPlayer from "react-player";
import mp4src from "./1720771036771.mp4";

const Video: React.FC = () => {
    return <ReactPlayer url={[mp4src]} controls width="375px" height="200px" />;
};

export default Video;
