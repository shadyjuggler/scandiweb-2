import { ProductCard } from "../UI/ProductCard";
import { useProducts } from "../../context/ProductContext";
import { ucfirst } from "../../utils/ucfirst";
import { Link } from "react-router-dom";

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

export const ProductList: React.FC<ProductListProps> = ({ category }) => {
    const { products, isLoading, error } = useProducts();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!products) return <p>No product found.</p>;

    // Sort products by category
    const filteredProducts = products.filter((product) => {
        if (category === "all") {
            return product;
        }
        return product.category.name === category;
    });

    return (
        <section id="product-list" className="py-16">
            <div>
                <h1 className="text-4xl">{ucfirst(category)}</h1>
            </div>

            <div className="mt-16 flex justify-center flex-wrap gap-x-8 gap-y-8">
                {filteredProducts.map((product, i: number) => {
                    return (
                        <Link to={`product/${product.id}`}>
                            <ProductCard data={product} key={i} />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};
