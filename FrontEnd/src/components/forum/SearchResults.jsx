import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import Popup from "../common/Popup";
import { useGlobalContext } from "../../context/ContextProvider";
import ForumCard from "./ForumCard";

const SearchResults = ({ searching, searchResults, setSearched }) => {
    const { notify } = useGlobalContext();

    const [selected, setSelected] = useState({});
    const [showSelected, setShowSelected] = useState(false);

    return (
        <>
            <div className="absolute left-0 right-0 lg:left-auto lg:right-auto mx-auto lg:mx-0 mt-1 z-30 w-full max-w-md sm:max-w-xl lg:max-w-sm bg-gray-700 rounded-lg shadow-sm shadow-green-600">
                {searching ? (
                    <FaSpinner className="animate-spin w-5 h-5 text-gray-400 mx-auto my-5" />
                ) : (
                    <>
                        {searchResults.length > 0 ? (
                            <ul className="divide-y divide-gray-600">
                                {searchResults.map((result) => (
                                    <li key={result._id}>
                                        <button
                                            onClick={() => {
                                                setSearched(false);
                                                setSelected(result);
                                                setShowSelected(true);
                                            }}
                                            className="transition-all block w-full text-left px-4 py-4 text-sm text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                            {result.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-5 text-slate-400">
                                <AiOutlineInfoCircle className="w-5 h-5 inline-block mr-1" />
                                No results found
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Selected forum popup */}
            <Popup show={showSelected} setShow={setShowSelected} ring={true}>
                <div className="text-left w-screen max-w-sm sm:max-w-lg max-h-96 overflow-y-auto">
                    <ForumCard
                        forum={selected}
                        checkRes={(res) =>
                            res >= 400
                                ? notify("error", "Error getting forum")
                                : null
                        }
                        notify={notify}
                        refreshAll={props.refreshAll}
                    />
                </div>
            </Popup>
        </>
    );
};

export default SearchResults;
