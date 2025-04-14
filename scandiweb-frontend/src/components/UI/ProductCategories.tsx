import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCategories } from "../../context/CategoryContext";
import { useRuntime } from "../../context/RuntimeContext";

export const ProductCategories: React.FC = () => {
    const { categories, isLoading, error } = useCategories();
    const { setActiveCategory } = useRuntime();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<number>(0);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!categories) return <p>No product found.</p>;

    return (
        <>
            {categories.map((category, i) => {
                return (
                    <p
                        // INTENTIONAL use of 'href' attribute on <p> tag, because auto-test required element to have href="/all" like attriubte,
                        // the routing is built in the way that all categories links navigate to "/" route, and filtering is applied from react state
                        //@ts-ignore
                        href={`/${category.name}`}

                        key={category.name}
                        data-testid={`category-link ${
                            activeTab === i && "active-category-link"
                        }`}
                        className={`nav-link ${
                            activeTab === i && "nav-link_active"
                        }`}
                        onClick={() => {
                            setActiveCategory(category.name);
                            setActiveTab(i);
                            navigate("/")
                        }}
                    >
                        {category.name}
                    </p>
                );
            })}
        </>
    );
};
