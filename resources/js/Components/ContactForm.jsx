import React from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import InputError from "./InputError";

const ContactForm = ({ closeModal, contact, disabled = false }) => {
    const { data, setData, put, errors } = useForm({
        id: contact.id,
        prenom: contact.prenom,
        nom: contact.nom,
        email: contact.e_mail,
        organisation: contact.organisation.nom,
        adresse: contact.organisation.adresse,
        code_postal: contact.organisation.code_postal,
        ville: contact.organisation.ville,
        statut: contact.organisation.statut,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        put(route("contacts.update", { contact: data }));
        data.prenom &&
            data.nom &&
            data.email &&
            data.organisation &&
            data.adresse &&
            data.code_postal &&
            data.ville &&
            data.statut &&
            closeModal();
    };

    return (
        <form onSubmit={handleSubmit} className="w-[700px]">
            <div className="pt-6 px-8">
                <h1 className="font-medium text-2xl">Detail un contact</h1>
                <div className="flex mt-5 w-full">
                    <div className="flex w-1/2 flex-col mr-2">
                        <InputLabel value="Prenom" />
                        <TextInput
                            onChange={(e) => setData("prenom", e.target.value)}
                            value={data.prenom}
                            disabled={disabled}
                        />
                        <InputError message={errors.prenom} />
                    </div>
                    <div className="flex w-1/2 flex-col ml-2">
                        <InputLabel value="Nom" />
                        <TextInput
                            onChange={(e) => setData("nom", e.target.value)}
                            value={data.nom}
                            disabled={disabled}
                        />
                        <InputError message={errors.nom} />
                    </div>
                </div>
                <div className="mt-3 flex flex-col w-full">
                    <InputLabel value="E-mail" />
                    <TextInput
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                            disabled={disabled}
                        />
                        <InputError message={errors.code_postal} />
                    </div>
                    <div className="flex w-full flex-col ml-2">
                        <InputLabel value="Ville" />
                        <TextInput
                            onChange={(e) => setData("ville", e.target.value)}
                            value={data.ville}
                            disabled={disabled}
                        />
                        <InputError message={errors.ville} />
                    </div>
                </div>
                <div className="mt-3 flex flex-col">
                    <InputLabel value="Statut" />
                    <select
                        className="border-2 border-gray-200 rounded px-2 w-1/2 capitalize"
                        onChange={(e) => setData("statut", e.target.value)}
                        defaultValue={data.statut.toLowerCase()}
                        disabled={disabled}
                    >
                        <option value="lead">Lead</option>
                        <option value="client">Client</option>
                        <option value="prospect">Prospect</option>
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
                <button
                    disabled={disabled}
                    className="bg-[#58bbc8] text-white font-medium px-3 py-1.5 border border-gray-300 rounded-md"
                >
                    Valider
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
