import { Component } from "react";

// Assets
import "./ProductList.scss";

// Helpers
import capitalizeFirstChar from "../../functions/helpers/capitalizeFirstChar";

// Components
import Skeleton from "../Skeleton/Skeleton";
import Product from "./Product/Product";


class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loading, categories, activeCategoryIndex, products, onQuickShopClick } = this.props;

        // console.log(categories[activeCategoryIndex]);

        const content = products.filter(product => {
            if (categories[activeCategoryIndex] == "all") {
                return product;
            }
            if (product.category_id === categories[activeCategoryIndex]) {
                return product;
            }
        }).map(data => {
            return (
                <Product
                    key={data.id}
                    productData={data}
                    onQuickShopClick={onQuickShopClick}
                />
            )
        });

        const skeletons = new Array(6).
            fill(null).
            map((_, i) => {
                return (
                    <div key={i} className="placeholder" style={{ width: "30%" }}>
                        <Skeleton variant={"rect"} width={"100%"} height={"300px"} />
                        <Skeleton variant={"rect"} width={"100%"} height={"28px"} />
                        <Skeleton variant={"rect"} width={"100%"} height={"28px"} />
                    </div>
                )
            });

        return (
            <div className="product-list">
                {
                    loading ?
                        <Skeleton variant={"rect"} width={"120px"} height={"40px"} margin={"0px"} />
                        :
                        <h1 className="product-list__title">{loading ? "" : capitalizeFirstChar(categories[activeCategoryIndex])}</h1>
                }
                <div className="product-list__wrapper">
                    {
                        loading ?
                            skeletons
                            :
                            content
                    }
                </div>
            </div>
        )
    }
}

export default ProductList;