import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";

import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NavTop } from "./components/NavTop";
import { CheckoutPage } from "./pages/CheckoutPage";

export const App = () => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart === null)
        existingCart = [];
    else
        existingCart = JSON.parse(existingCart);

    let existingQuantities = localStorage.getItem("quantities");
    if (existingQuantities === null)
        existingQuantities = {};
    else
        existingQuantities = JSON.parse(existingQuantities);

    const [cart, setCart] = useState(existingCart);
    const [quantities, setQuantities] = useState(existingQuantities);
    const [activeTab, setActiveTab] = useState(null);
    const [textFilter, setTextFilter] = useState("");

    useEffect(() => {
        for (const [itemid, quantity] of Object.entries(quantities)) {
            if (quantity <= 0)
                removeFromCart({ "itemid": itemid });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("quantities", JSON.stringify(quantities));
    }, [cart, quantities]);

    const addToCart = (item) => {
        let idx = cart.findIndex((cartItem) => cartItem.itemid === item.itemid);
        if (idx !== -1)
            return;

        let tempQuantities = { ...quantities };
        tempQuantities[item.itemid] = 1;

        setCart([item, ...cart]);
        setQuantities(tempQuantities);
    }

    const removeFromCart = (item) => {
        let idx = cart.findIndex((cartItem) => cartItem.itemid === item.itemid);
        if (idx === -1)
            return;

        let temp = [...cart];
        temp.splice(idx, 1);

        let tempQuantities = { ...quantities };
        delete tempQuantities[item.itemid];

        setCart(temp);
        setQuantities(tempQuantities);
    }

    const setQuantity = (item, quantity) => {
        if (quantity < 1 || quantity > item.amount)
            return;
        else {
            let temp = { ...quantities };
            temp[item.itemid] = quantity;
            setQuantities(temp);
        }
    }

    return (
        <>
            <NavTop
                activeTab={activeTab}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                quantities={quantities}
                setQuantity={setQuantity}
                setTextFilter={setTextFilter}
            />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home
                            setActiveTab={setActiveTab}
                        />
                    </Route>
                    <Route exact path="/products">
                        <Products
                            setActiveTab={setActiveTab}
                            cart={cart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            textFilter={textFilter}
                            quantities={quantities}
                            setQuantity={setQuantity}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <CheckoutPage
                            setActiveTab={setActiveTab}
                            cart={cart}
                            removeFromCart={removeFromCart}
                            quantities={quantities}
                            setQuantity={setQuantity}
                        />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}