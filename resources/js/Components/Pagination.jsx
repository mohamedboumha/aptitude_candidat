import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ contacts }) => {
    const { from, to, total, links } = contacts;
    return (
        <div className="flex justify-between items-center">
            <div>
                Showing {from} to {to} of {total} results
            </div>
            <ul className="flex items-center -space-x-px h-10 text-base">
                {links.map((link, index) => {
                    if (link.label.toLowerCase().includes("previous")) {
                        return (
                            <li key={index}>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 1 1 5l4 4"
                                        />
                                    </svg>
                                </a>
                            </li>
                        );
                    }
                    if (link.label.toLowerCase().includes("next")) {
                        return (
                            <li key={index}>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                </a>
                            </li>
                        );
                    }
                    return (
                        <li key={index}>
                            <Link
                                href={link.url}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Pagination;
