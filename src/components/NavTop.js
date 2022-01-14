import { ShoppingCartDropdown } from "./ShoppingCartDropdown";
import logo from "../images/logo.png";


export const NavTop = ({ activeTab, cart, addToCart, removeFromCart, quantities, setQuantity, setTextFilter }) => {

    const filter = (e) => {
        setTextFilter(e.target.value);
    }

    return (
        <nav className="navbar" style={{
            position: "sticky",
            top: "0",
            zIndex: "5"
        }}>
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={logo} />
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="tabs">
                        <ul>
                            <li className={activeTab === "home" ? "is-active" : ""}>
                                <a href="/">Home</a>
                            </li>
                            <li className={activeTab === "products" ? "is-active" : ""}>
                                <a href="/products">Products</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className={"navbar-item " + (activeTab === "products" ? "" : "is-hidden")}>
                        <input type="text" onInput={filter} className="input" placeholder="Search"></input>
                    </div>
                    <div className="navbar-item">
                        <ShoppingCartDropdown
                            cart={cart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            quantities={quantities}
                            setQuantity={setQuantity}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}