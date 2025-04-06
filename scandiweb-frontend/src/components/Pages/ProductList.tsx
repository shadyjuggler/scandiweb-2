import { ProductService } from "../../graphql/services/ProductService";
import { useQueryService } from "../../hooks/useQueryService";
import { ProductCard } from "../UI/ProductCard";

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
    const { data, isLoading, error } = useQueryService(["products"], () =>
        ProductService.allProducts()
    );

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No product found.</p>;

    // Sort products by category
    const products = data.products.filter((product) => {
        if (category === "all") {
            return product;
        }
        return product.category.name === category;
    });

    return (
        <section id="product-list" className="py-16">
            <div>
                <h1 className="text-4xl">{category}</h1>
            </div>

            <div className="mt-16 flex justify-center flex-wrap gap-x-8 gap-y-8">
                {products.map((product, i: number) => {
                    return <ProductCard data={product} key={i} />;
                })}
            </div>
        </section>
    );
};
