import { useState } from "react";
import { Link } from "react-router-dom";

import { useCategories } from "../../context/CategoryContext";
import { useRuntime } from "../../context/RunTimeContext";


export const ProductCategories: React.FC = () => {
    const { categories, isLoading, error } = useCategories();
    const {setActiveCategory} = useRuntime();

    const [activeTab, setActiveTab] = useState<number>(0);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!categories) return <p>No product found.</p>;


    return (
        <>
            {categories.map((category, i) => {
                return (
                    <Link
                        to={"/"}
                        key={category.name}
                        onClick={() => {
                            setActiveCategory(category.name);
                            setActiveTab(i);
                        }}
                        className={`nav-link ${
                            activeTab === i && "nav-link_active"
                        }`}
                    >
                        {category.name}
                    </Link>
                );
            })}
        </>
    );
};
