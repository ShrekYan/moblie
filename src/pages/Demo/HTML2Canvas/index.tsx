import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

const HTML2CanvasPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [urlData, setUrlData] = useState<string>();
    useEffect(() => {
        html2canvas(containerRef.current as HTMLDivElement, {
            useCORS: true,
            backgroundColor: "transparent"
        }).then((canvas) => {
            const imageUrlData = canvas.toDataURL("image/png", 1);
            setUrlData(imageUrlData);
        });
    }, []);
    return (
        <div ref={containerRef}>
            <div style={{ width: "100%", height: "300px", background: "pink" }}></div>
            <div style={{ width: "100%", height: "300px", background: "oldlace" }}></div>
            <img src={urlData} style={{ width: "100%" }} />
        </div>
    );
};

export default HTML2CanvasPage;
