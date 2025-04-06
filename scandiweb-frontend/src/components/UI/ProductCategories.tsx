import { useState } from "react";
import { CategoryService } from "../../graphql/services/CategoryService";
import { useQueryService } from "../../hooks/useQueryService";

interface ProductCategoriesProps {
    setCategory: (category: string) => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({
    setCategory,
}) => {
    const { data, isLoading, error } = useQueryService(["categories"], () =>
        CategoryService.allCategories()
    );

    const [activeTab, setActiveTab] = useState<number>(0);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No product found.</p>;

    const categories = [{ name: "all" }, ...data.categories];

    return (
        <>
            {categories.map((category, i) => {
                return (
                    <p
                        onClick={() => {
                            setCategory(category.name);
                            setActiveTab(i);
                        }}
                        className={`nav-link ${
                            activeTab === i && "nav-link_active"
                        }`}
                    >
                        {category.name}
                    </p>
                );
            })}
        </>
    );
};
