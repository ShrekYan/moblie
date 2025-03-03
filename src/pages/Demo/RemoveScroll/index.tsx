import React, { useState } from "react";
import { RemoveScroll as RemoveScrollWrap } from "react-remove-scroll";
import styles from "./index.module.scss";

const RemoveScroll: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                style={{ padding: "10px 20px", fontSize: "16px" }}
            >
                打开模态框
            </button>
            <div style={{ height: 2000, width: "100%", backgroundColor: "pink" }}></div>
            {isOpen && (
                <div className={styles.overlay}>
                    <RemoveScrollWrap>
                        <div
                            className={styles.modalContent}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <div className={styles.title}>重要提示</div>
                            <div className={styles.scrollableArea}>
                                {[...Array(30)].map((_, i) => (
                                    <p key={i}>内容段落 #{i + 1}</p>
                                ))}
                            </div>
                        </div>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="关闭"
                        >
                            x
                        </button>
                    </RemoveScrollWrap>
                </div>
            )}
        </div>
    );
};

export default RemoveScroll;
