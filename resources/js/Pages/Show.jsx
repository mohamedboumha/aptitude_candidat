import ContactForm from "@/Components/ContactForm";
import React from "react";

const Show = ({ contact, closeModal }) => {
    return (
        <ContactForm
            contact={contact}
            closeModal={closeModal}
            disabled={true}
        />
    );
};

export default Show;
