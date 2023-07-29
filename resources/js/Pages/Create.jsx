import ConfirmMessage from "@/Components/ConfirmMessage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Create = ({ closeModal, contacts, organisations }) => {
    const { data, setData, post, errors } = useForm({
        prenom: "",
        nom: "",
        email: "",
        organisation: "",
        adresse: "",
        code_postal: "",
        ville: "",
        statut: "",
    });
    const [confirmMessage, setConfirmMessage] = useState(false);

    const closeConfirmMessageModal = () => setConfirmMessage(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(contacts);
        const checkContact = contacts.find(
            (c) =>
                c.nom.toLowerCase() === data.nom.toLowerCase() &&
                c.prenom.toLowerCase() === data.prenom.toLowerCase()
        );
        if (
            data.prenom &&
            data.nom &&
            data.email &&
            data.organisation &&
            data.adresse &&
            data.code_postal &&
            data.ville &&
            data.statut &&
            checkContact
        ) {
            return setConfirmMessage(true);
        } else {
            return post(route("contacts.store"));
        }
    };
    const confirm = () => {
        post(route("contacts.store"));
        closeConfirmMessageModal();
        closeModal();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-[700px]">
                <div className="pt-6 px-8">
                    <h1 className="font-medium text-2xl">Crée un contact </h1>
                    <div className="flex mt-5 w-full">
                        <div className="flex w-1/2 flex-col mr-2">
                            <InputLabel value="Prenom" />
                            <TextInput
                                onChange={(e) =>
                                    setData("prenom", e.target.value)
                                }
                                value={data.prenom}
                                placeholder="Prenom"
                            />
                            <InputError message={errors.prenom} />
                        </div>
                        <div className="flex w-1/2 flex-col ml-2">
                            <InputLabel value="Nom" />
                            <TextInput
                                onChange={(e) => setData("nom", e.target.value)}
                                value={data.nom}
                                placeholder="Nom"
                            />
                            <InputError message={errors.nom} />
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col w-full">
                        <InputLabel value="E-mail" />
                        <TextInput
                            type="email"
                            onChange={(e) => setData("email", e.target.value)}
                            value={data.email}
                            placeholder="Email"
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="mt-3 flex flex-col w-full">
                        <InputLabel value="Entreprise" />
                        <TextInput
                            onChange={(e) =>
                                setData("organisation", e.target.value)
                            }
                            value={data.organisation}
                            placeholder="Organisation"
                        />
                        <InputError message={errors.organisation} />
                    </div>
                    <div className="mt-3 flex flex-col w-full">
                        <InputLabel value="Adresse" />
                        <textarea
                            className="border-2 border-gray-200 rounded p-2"
                            rows="4"
                            onChange={(e) => setData("adresse", e.target.value)}
                            value={data.adresse}
                            placeholder="Adresse"
                        ></textarea>
                        <InputError message={errors.adresse} />
                    </div>
                    <div className="flex mt-3 w-full ">
                        <div className="flex w-1/4 flex-col mr-2">
                            <InputLabel value="Code postal" />
                            <TextInput
                                type="number"
                                onChange={(e) =>
                                    setData("code_postal", e.target.value)
                                }
                                value={data.code_postal}
                                placeholder="Code Postal"
                            />
                            <InputError message={errors.code_postal} />
                        </div>
                        <div className="flex w-full flex-col ml-2">
                            <InputLabel value="Ville" />
                            <TextInput
                                onChange={(e) =>
                                    setData("ville", e.target.value)
                                }
                                value={data.ville}
                                placeholder="Ville"
                            />
                            <InputError message={errors.ville} />
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col">
                        <InputLabel value="Statut" />
                        <select
                            className="border-2 border-gray-200 rounded px-2 w-1/2 capitalize"
                            onChange={(e) => setData("statut", e.target.value)}
                            value={data.statut}
                        >
                            <option hidden>Select your option</option>
                            <option value="lead">Lead</option>
                            <option value="client">Client</option>
                            <option value="Prospect">Prospect</option>
                        </select>
                        <InputError message={errors.statut} />
                    </div>
                </div>
                <div className="flex justify-end items-center w-full bg-gray-100 rounded-b-lg relative mt-10 p-4">
                    <button
                        className="font-medium px-3 py-1.5 border border-gray-300 rounded-md mr-1"
                        type="button"
                        onClick={closeModal}
                    >
                        Annuler
                    </button>
                    <button className="bg-[#58bbc8] text-white font-medium px-3 py-1.5 border border-gray-300 rounded-md">
                        Valider
                    </button>
                </div>
            </form>
            <Modal show={confirmMessage} onClose={closeConfirmMessageModal}>
                <ConfirmMessage
                    closeModal={closeConfirmMessageModal}
                    confirm={confirm}
                    title="Doublon"
                >
                    Un contact existe avec le meme prenom et le meme nom.
                    <p>Etes-vous sur de vouloir ajouter ce contact ?</p>
                </ConfirmMessage>
            </Modal>
        </>
    );
};

export default Create;
