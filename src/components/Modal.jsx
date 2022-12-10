import React from "react";

function Modal({ children, isOpen, title, onClose }) {
    return (
        isOpen && (
            <div className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-sm">
                <div className="w-[50rem] bg-white shadow-lg p-4 rounded-lg">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-bold text-lg">{title}</h3>
                        </div>
                        <div>
                            <h5
                                className="w-10 h-10 flex justify-center items-center text-xl text-red-600 bg-red-300 rounded-full p-4 cursor-pointer"
                                onClick={onClose}
                            >
                                X
                            </h5>
                        </div>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        )
    );
}

export default Modal;
