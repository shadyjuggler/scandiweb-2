import React, { ReactNode } from "react";

interface SlideProps {
    children: ReactNode;
}

export const Slide: React.FC<SlideProps> = ({ children }) => {
    return (
        <div className="w-full flex-shrink-0 snap-center">
            <div className="w-full h-full">{children}</div>
        </div>
    );
};
