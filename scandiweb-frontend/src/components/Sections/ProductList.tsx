import { ProductCard } from "../UI/ProductCard";
import { useProducts } from "../../context/ProductContext";
import { ucfirst } from "../../utils/ucfirst";
import { Link } from "react-router-dom";
import { useRuntime } from "../../context/RuntimeContext";

import { Section } from "../Layouts/Section";
import { Listing } from "../Layouts/Listing";

export const ProductList: React.FC = () => {
    const { products, isLoading, error } = useProducts();

    const { activeCategory } = useRuntime();

    if (!activeCategory) return <p>Waiting for filters to apply...</p>;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!products) return <p>No product found.</p>;

    // Sort products by category
    const filteredProducts = products.filter((product) => {
        if (activeCategory === "all") {
            return product;
        }
        return product.category.name === activeCategory;
    });

    return (
        <Section id="product-list">
            <div className="mt-4">
                <h1 className="text-4xl">{ucfirst(activeCategory)}</h1>
            </div>

            <div className="mt-16">
                <Listing>
                    {filteredProducts.map((product, i: number) => {
                        return <ProductCard product={product} key={i} />;
                    })}
                </Listing>
            </div>
        </Section>
    );
};
