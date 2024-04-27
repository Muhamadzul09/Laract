import React from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";

export default function Homepage(props) {
    return (
        <div className="min-h-screen bg-state-50 text-black text-1xl">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="pt-20 mt-10">
                <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4">
                    <NewsList news={props.news.data} />
                </div>
                <div className="flex justify-center mb-3">
                    <Paginator meta={props.news.meta} />
                </div>
            </div>
        </div>
    );
}
