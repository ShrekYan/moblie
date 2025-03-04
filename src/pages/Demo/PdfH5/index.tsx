import React, { useRef, useEffect } from "react";
import PDFH5 from "pdfh5";
import pdfUrl from "./test.pdf";
import "pdfh5/css/pdfh5.css"; // 必须引入样式

interface PDFH5Instance {
    destroy: () => void;
}

const PdfH5: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pdfInstance = useRef<PDFH5Instance | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // 初始化配置
        pdfInstance.current = new PDFH5(containerRef.current, {
            pdfurl: pdfUrl // 确保路径正确// 指定渲染引擎
        });
    }, []);

    return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
};

export default PdfH5;
