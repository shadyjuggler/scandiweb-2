import React, { createContext, useContext } from "react";
import { useState } from "react";

type ModalConextType = {
    isModalOpen: boolean;
    toggleModalVisibility: (isOpen: boolean) => void;
};

const ModalConext = createContext<ModalConextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const toggleModalVisibility = (isOpen: boolean) => {
        setModalOpen(isOpen);
    };

    return (
        <ModalConext.Provider
            value={{
                isModalOpen,
                toggleModalVisibility,
            }}
        >
            {children}
        </ModalConext.Provider>
    );
};

export const useModal = (): ModalConextType => {
    const context = useContext(ModalConext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
