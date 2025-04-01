import { Card } from "./Card";

interface ProductDetailsInterface {
    description: string;
}

export const ProductDetials: React.FC<ProductDetailsInterface> = ({
    description,
}) => {
    return (
        <section id="product-details" className="py-16">
            <div className="flex gap-16">
                <div className="flex-2/3 bg-amber-500">abc</div>
                <div className="flex-1/3 ">
                    <div>
                        <p className="text-3xl font-semibold">Price</p>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle">size:</p>
                        <div className="mt-2 flex gap-3">
                            <span className="min-w-15 py-2.5 border border-black">
                                <p className="sourcesanspro text-center uppercase">xs</p>
                            </span>
                            <span className="min-w-15 py-2.5 border border-black bg-black">
                                <p className="sourcesanspro text-center uppercase text-white">s</p>
                            </span>
                            <span className="min-w-15 py-2.5 border border-black">
                                <p className="sourcesanspro text-center uppercase">m</p>
                            </span>
                            <span className="min-w-15 py-2.5 border border-black">
                                <p className="sourcesanspro text-center uppercase">l</p>
                            </span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle">color:</p>
                        <div className="mt-2 flex gap-2 ">
                            <span className="border-2 border-white outline-2 outline-[#5ECE7B] w-8 h-8 bg-amber-300"></span>
                            <span className="w-8 h-8 bg-amber-400"></span>
                            <span className="w-8 h-8 bg-amber-500"></span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle">price:</p>
                        <p className="font-bold text-2xl">$50.00</p>
                    </div>
                    <div className="mt-4">
                        <button className="btn btn-primary py-2.5">
                            add to cart
                        </button>
                    </div>
                    <div className="mt-6">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
