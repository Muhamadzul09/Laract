// Import library yang diperlukan
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useEffect } from "react";

export default function Dashboard({ auth, mynews, flash }) {
    const [isNotify, setIsNotify] = useState(false);
    // useEffect(() => {
    //     if (auth.mynews) {
    //         // Memperbarui pemanggilan Inertia.get untuk mengambil berita yang terkait dengan pengguna
    //         Inertia.get(`/dashboard`);
    //         console.log("auth.mynews", auth.mynews);
    //     }
    // }, [auth.mynews]);

    // Menggunakan auth.mynews sebagai dependensi

    useEffect(() => {
        setIsNotify(!!flash.message);
        console.log("pesan", flash.message);
    }, [flash.message]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight pt-10 mt-10">
                    Berita saya
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                {/* card read data awal */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="card w-full bg-base-100 shadow-xl">
                        {/* Tampilkan pesan flash jika ada */}
                        <div>
                            {isNotify && (
                                <div
                                    role="alert"
                                    className="alert alert-info text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="stroke-current shrink-0 w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span>{flash.message}</span>
                                </div>
                            )}
                        </div>
                        <div className="card-body">
                            ALL BERITA
                            <div className="overflow-x-auto">
                                {mynews && mynews.length > 0 ? (
                                    <table className="table">
                                        {/* <!-- head --> */}
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Category</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Mapping berita */}
                                            {mynews.map((news, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="w-25">{news.title}</td>
                                                    <td className="w-80">{news.description}</td>
                                                    <td>{news.category}</td>
                                                    <td className="text-center">
                                                        <button className="btn btn-ghost bg-primary btn-xs text-white ">
                                                            <Link href={'/'} as="button">details</Link>
                                                        </button>
                                                        <button className="btn btn-ghost bg-success btn-xs text-white my-2 mx-2">
                                                            <Link href="/news/edit" as="button" method="get" data={{id: news.id }}>edit</Link>
                                                        </button>
                                                        <button className="btn btn-ghost bg-error btn-xs text-white ">
                                                            <Link href="/news/delete" as="button" method="delete" data={{id: news.id }}>delete</Link>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div>Anda tidak mempunyai data, silahkan tambahkan data anda di menu <a href="/create" style={{ color: "blue" }}>create data</a></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* card read data akhir */}
            </div>
        </AuthenticatedLayout>
    );
    
}


