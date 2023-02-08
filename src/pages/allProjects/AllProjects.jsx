import { useState } from "react";
import ReactPaginate from "react-paginate";
import CardProject from "../../components/common/cardProject/CardProject";

import Projects from "../../components/common/cardProject/projects"
import { FaSearch } from 'react-icons/fa'
// import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx'

function AllProjects() {

    const [search, setSearch] = useState("");
    const [allProjects, setAllProjects] = useState(Projects);

    const searchedProject = allProjects.filter((item) => {
        if (search.value === "") return item;

        if (item.name.toLowerCase().includes(search.toLowerCase())) return item;
    });

    // const [category, setCategory] = useState("All");

    // Pagination
    const [pageNumber, setPageNumber] = useState(0);

    const projectPerPage = 10;

    const visitedPage = pageNumber * projectPerPage;

    const displayPage = searchedProject.slice(
        visitedPage,
        visitedPage + projectPerPage
    );

    const pageCount = Math.ceil(searchedProject.length / projectPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <>

            <div className='search'>
                <input
                    placeholder='Busca por el nombre'
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className='search_icon' />
            </div>

            <section>
                <div className='projects-cards'>
                    {displayPage.map((item) => (
                        <CardProject
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>

                <div className="container_paginate">
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={changePage}
                        previousLabel="Anterior"
                        nextLabel="Siguiente"
                        containerClassName="paginationBttns"
                        activeClassName={"active_pagination"}
                    />
                </div>
            </section>
        </>
    );
}

export default AllProjects;