import cart from "../../assets/cart.svg";
import logo from "../../assets/logo.svg";

export const Navbar: React.FC = () => {
    return (
        <nav id="navbar" className="py-4 flex items-center">
            <div className="basis-1/3 flex mt-4 justify-left">
                <p className="nav-link nav-link_active">ALL</p>
                <p className="nav-link">TECH</p>
                <p className="nav-link">CLOTHES</p>
            </div>

            <div className="basis-1/3 flex justify-center">
                <img src={logo} alt="logo" />
            </div>

            <div className="basis-1/3 flex justify-end">
                <button className="w-10 h-10 flex items-center justify-center cursor-pointer">
                    <img src={cart} alt="cart" />
                </button>
            </div>
        </nav>
    );
};
