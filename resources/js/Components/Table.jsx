import { Link, useForm } from "@inertiajs/react";
import EditContact from "../Pages/Edit";
import ShowContact from "../Pages/Show";
import { FaRegTrashCan, FaRegEye } from "react-icons/fa6";
import { BsPencil } from "react-icons/bs";
import Modal from "./Modal";
import { useState } from "react";
import ConfirmMessage from "./ConfirmMessage";

const statut = {
    LEAD: "bg-[#c8ddfa] text-[#5f79bb]",
    CLIENT: "bg-[#c7eedb] text-[#5f8b78]",
    PROSPECT: "bg-[#f6dac0] text-[#894127]",
};

const Table = ({ contacts, order }) => {
    const [contact, setContact] = useState({});
    const [contactEditModal, setContactEditModal] = useState(false);
    const [contactShowModal, setContactShowModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState(false);
    const newOrder = order == "asc" ? "desc" : order == "desc" ? "asc" : "asc";
    const { delete: destroy } = useForm();

    const closeConfirmMessageModal = () => setConfirmMessage(false);
    const closeContactShowModal = () => setContactShowModal(false);
    const closeContactEditModal = () => setContactEditModal(false);

    const confirm = () => {
        destroy(route("contacts.destroy", { contact }));
        closeConfirmMessageModal();
    };

    return (
        <>
            <table className="w-full text-sm text-left text-gray-500 border shadow">
                <thead className="text-xs text-[#99a2af] uppercase bg-[#f8fafc]">
                    <tr className="border-b">
                        <th scope="col" className="px-6 py-3 w-1/3">
                            <Link
                                href={`http://localhost:8000/contacts?column=nom&order=${newOrder}`}
                            >
                                Nom du contact
                            </Link>
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/2">
                            Société
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Statut
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.data.map((contact) => {
                        return (
                            <tr
                                key={contact.id}
                                className="bg-white text-[#3b4554] border-b"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-normal whitespace-nowrap"
                                >
                                    {contact.nom}
                                </th>
                                <td className="px-6 capitalize py-4 font-semibold">
                                    {contact.organisation.nom}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`${
                                            statut[
                                                contact.organisation.statut.toUpperCase()
                                            ]
                                        } font-semibold capitalize px-2 py-0 w-fit rounded-xl flex justify-center items-center`}
                                    >
                                        {contact.organisation.statut.toLowerCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex justify-center items-center">
                                    <button
                                        onClick={() => {
                                            setContactShowModal(true);
                                            setContact(contact);
                                        }}
                                    >
                                        <FaRegEye className="text-base" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setContactEditModal(true);
                                            setContact(contact);
                                        }}
                                    >
                                        <BsPencil className="fa-solid fa-pen mx-3 text-base" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmMessage(true);
                                            setContact(contact);
                                        }}
                                    >
                                        <FaRegTrashCan className="fa-regular fa-trash-can text-base text-red-400" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal show={contactShowModal} onClose={closeContactShowModal}>
                <ShowContact
                    contact={contact}
                    closeModal={closeContactShowModal}
                />
            </Modal>
            <Modal show={contactEditModal} onClose={closeContactEditModal}>
                <EditContact
                    contact={contact}
                    closeModal={closeContactEditModal}
                />
            </Modal>
            <Modal show={confirmMessage} onClose={closeConfirmMessageModal}>
                <ConfirmMessage
                    closeModal={closeConfirmMessageModal}
                    confirm={confirm}
                    title="Supprimer le contact"
                >
                    Etes-vous sur de vouloir supprimer ce contact ?
                    <p>Cette operation est irreversible.</p>
                </ConfirmMessage>
            </Modal>
        </>
    );
};

export default Table;
