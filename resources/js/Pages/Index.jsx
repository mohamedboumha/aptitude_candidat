import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SearchForm from "@/Components/SearchForm";
import Table from "@/Components/Table";
import CreateContact from "./Create";

import { useState } from "react";

const Contact = ({ contacts, allOrganisations, allContacts, order }) => {
    const [contactCreateModal, setContactCreateModal] = useState(false);
    const closeContactCreateModal = () => setContactCreateModal(false);

    return (
        <div className="p-12">
            <h1 className="text-4xl font-medium">Liste des contacts</h1>
            <div className="mt-6 flex items-center justify-between">
                <SearchForm route={route("contacts.index")} />
                <button
                    onClick={() => setContactCreateModal(true)}
                    className="bg-[#58bbc8] text-white font-medium px-5 py-1.5 border border-black rounded-md"
                >
                    + Ajouter
                </button>
            </div>

            <div className="mt-6">
                {contacts.data.length ? (
                    <Table order={order} contacts={contacts} />
                ) : (
                    <p className="text-center text-3xl mt-5">
                        There is no contacts!
                    </p>
                )}
            </div>
            {contacts.total > contacts.per_page && (
                <div className="mt-5">
                    <Pagination contacts={contacts} />
                </div>
            )}
            <Modal show={contactCreateModal} onClose={closeContactCreateModal}>
                <CreateContact
                    organisations={allOrganisations}
                    contacts={allContacts}
                    closeModal={closeContactCreateModal}
                />
            </Modal>
        </div>
    );
};

export default Contact;
