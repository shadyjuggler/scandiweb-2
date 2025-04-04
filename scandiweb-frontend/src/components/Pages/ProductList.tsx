import { Card } from "../UI/Card";

export const ProductList: React.FC = () => {
    return (
        <section id="product-list" className="py-16">
            <div>
                <h1 className="text-4xl">All</h1>
            </div>

            <div className="mt-16 flex justify-center flex-wrap gap-x-8 gap-y-8">
                {Array(6)
                    .fill(0)
                    .map((_: any, i: number) => {
                        return (
                            <Card
                                key={i}
                                imgPath="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                                title="Title"
                                price="$50.00"
                                isInStock={false}
                            />
                        );
                    })}
            </div>
        </section>
    );
};
