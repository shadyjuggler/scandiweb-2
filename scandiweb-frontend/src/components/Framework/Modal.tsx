import React, { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
    backdropClassName?: string;
    onBackdropClick?: () => void 
};

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    children,
    className = "",
    backdropClassName = "",
    onBackdropClick
}) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!modalRef.current) return;

        if (isOpen) {
            modalRef.current.style.overflow = "hidden";
        } else {
            modalRef.current.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (typeof document === "undefined") return null;

    const modalContent = (
        <div
            ref={modalRef}
            onClick={() => onBackdropClick && onBackdropClick()}
            className={`fixed top-0 left-0 z-50 flex items-center justify-center ${backdropClassName}`}
            role="dialog"
            aria-modal="true"
        >
            <div className="container mx-auto">
                <div
                    className={`${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    );

    return isOpen ? ReactDOM.createPortal(modalContent, document.body) : null;
};
