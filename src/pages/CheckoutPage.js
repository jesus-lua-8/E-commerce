import { useEffect, useState } from "react"

import { ShoppingCartCheckoutItem } from "../components/ShoppingCartCheckoutItem";

export const CheckoutPage = ({ setActiveTab, cart, removeFromCart, quantities, setQuantity }) => {
    useEffect(() => {
        setActiveTab(null);
    }, [])

    return (
        <>
            <div className="container has-text-centered my-6 has-background-grey-lighter p-3" style={{
                borderRadius: "10px",
                width: "40%"
            }}>
                <h1 className="title">Your Cart</h1>
                <CheckoutPageInner
                    cart={cart}
                    removeFromCart={removeFromCart}
                    quantities={quantities}
                    setQuantity={setQuantity}
                />
            </div>
        </>
    )
}

const CheckoutPageInner = ({ cart, removeFromCart, quantities, setQuantity }) => {
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [shippingCharge, setShippingCharge] = useState(0.0);
    const [handlingCharge, setHandlingCharge] = useState(0.0);

    const [totalString, setTotalString] = useState("");
    const [shippingString, setShippingString] = useState("");
    const [handlingString, setHandlingString] = useState("");

    useEffect(() => {
        let cost = 0.0;
        for (const item of cart)
            cost += quantities[item.itemid] * item.itemprice;

        cost += shippingCharge;
        cost += handlingCharge;

        setTotalString(cost.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        }));
        setShippingString(shippingCharge.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        }));
        setHandlingString(handlingCharge.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        }));

    }, [cart, quantities, shippingCharge, handlingCharge])

    if (cart.length !== 0) {
        return (
            <>
                {cart.map((item) => (
                    <ShoppingCartCheckoutItem
                        key={item.itemid}
                        item={item}
                        removeFromCart={removeFromCart}
                        quantities={quantities}
                        setQuantity={setQuantity}
                    />
                ))}
                <hr className="hr"></hr>
                <div className="column is-4 is-offset-8">
                    <p style={{textAlign: "right"}}>Shipping: {shippingString}</p>
                    <p style={{textAlign: "right"}}>Handling: {handlingString}</p>
                    <p style={{textAlign: "right"}}>Total cost: <strong>{totalString}</strong></p>
                </div>
                <hr className="hr"></hr>
                <a className="button is-success is-fullwidth">Continue</a>
            </>
        )
    } else
        return <a className="button is-info" href="/products">Shop Products</a>
}