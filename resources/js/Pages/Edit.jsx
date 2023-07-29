import ContactForm from "@/Components/ContactForm";
import React from "react";

const Edit = ({ contact, closeModal }) => {
    return <ContactForm contact={contact} closeModal={closeModal} />;
};

export default Edit;
