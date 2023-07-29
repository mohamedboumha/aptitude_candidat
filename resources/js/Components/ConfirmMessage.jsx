import React from "react";
import { PiWarningBold } from "react-icons/pi";

const ConfirmMessage = ({ children, title, confirm, closeModal }) => {
    return (
        <section className="w-[700px]">
            <div className="p-6">
                <div className="flex font-medium items-center">
                    <div className="bg-[#f9e9e8] w-fit px-1.5 py-1 rounded-full mr-4">
                        <PiWarningBold className="text-[#d96961] text-xl" />
                    </div>
                    <span className="text-2xl">{title}</span>
                </div>
                <div className="mt-10 px-12">{children}</div>
            </div>
            <div className="flex justify-end items-center w-full bg-gray-100 rounded-b-lg relative mt-10 p-4">
                <button
                    className="font-medium px-3 py-1.5 border border-gray-300 rounded-md mr-1"
                    type="button"
                    onClick={closeModal}
                >
                    Annuler
                </button>
                <button
                    onClick={confirm}
                    className="bg-[#58bbc8] text-white font-medium px-3 py-1.5 border border-gray-300 rounded-md"
                >
                    Confirmer
                </button>
            </div>
        </section>
    );
};

export default ConfirmMessage;
