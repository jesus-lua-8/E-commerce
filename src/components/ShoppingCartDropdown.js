import { useState } from "react";
import { ShoppingCartItem } from "./ShoppingCartDropdownItem";


export const ShoppingCartDropdown = ({ cart, addToCart, removeFromCart, quantities, setQuantity }) => {
    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    }

    return (
        <div className={"dropdown is-right " + (active ? "is-active" : "")}>
            <div className="dropdown-trigger">
                <a onClick={toggleActive} className="button is-primary">
                    <span>Cart</span>
                    <span className="icon">
                        <i className="fas fa-shopping-cart"></i>
                    </span>
                </a>
            </div>
            <div className="dropdown-menu" style={{ minWidth: "20rem" }}>
                <div className="dropdown-content">
                    {cart.length !== 0 &&
                        <ShoppingCartItems
                            cart={cart}
                            removeFromCart={removeFromCart}
                            quantities={quantities}
                            setQuantity={setQuantity}
                        />
                    }
                    {cart.length === 0 &&
                        <div className="dropdown-item">
                            <p><b>Your cart is empty.</b></p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const ShoppingCartItems = ({ cart, removeFromCart, quantities, setQuantity }) => {
    const goToCheckout = () => {
        window.location.href = "/checkout";
    }

    return (
        <>
            <p className="has-text-centered"><b>Your Cart</b></p>
            {
                cart.map((item) => (
                    <ShoppingCartItem
                        key={item.itemid}
                        item={item}
                        removeFromCart={removeFromCart}
                        quantities={quantities}
                        setQuantity={setQuantity}
                    />
                ))
            }
            <div className="columns mx-3">
                <div className="column">
                    <a onClick={goToCheckout} className="button is-success is-fullwidth">Checkout</a>
                </div>
            </div>
        </>
    )
}