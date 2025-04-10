import { ProductCard } from "../UI/ProductCard";
import { useProducts } from "../../context/ProductContext";
import { ucfirst } from "../../utils/ucfirst";
import { Link } from "react-router-dom";
import { useRuntime } from "../../context/RunTimeContext";

interface ProductListProps {
    category: string;
    products?: {
        id: string;
        title: string;
        price: string;
        imgPath: string;
        inStock: boolean;
    };
}

export const ProductList: React.FC<ProductListProps> = () => {
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
        <section id="product-list" className="mt-20 py-16">
            <div>
                <h1 className="text-4xl">{ucfirst(activeCategory)}</h1>
            </div>

            <div className="mt-16 flex justify-center flex-wrap gap-x-8 gap-y-8">
                {filteredProducts.map((product, i: number) => {
                    return (
                        <Link key={product.id} to={`product/${product.id}`}>
                            <ProductCard product={product} key={i} />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};
