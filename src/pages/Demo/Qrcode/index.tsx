import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QrcodePage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        QRCode.toCanvas(
            canvasRef.current,
            "https://galaxy.qiangungun.com/galaxy/share-react/build/index.html#/tab/home",
            (error) => {
                if (error) console.error(error);
                console.log("success!");
            }
        );
    }, []);
    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default QrcodePage;
