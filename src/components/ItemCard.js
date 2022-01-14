import { useEffect, useState } from "react";

export const ItemCard = ({ item, cart, addToCart, removeFromCart, textFilter, quantities, setQuantity }) => {
    const [isInCart, setIsInCart] = useState(false);

    const add = () => {
        addToCart(item);
    }

    const remove = () => {
        removeFromCart(item);
    }

    useEffect(() => {
        let idx = cart.findIndex((cartItem) => cartItem.itemid === item.itemid);
        if (idx === -1)
            setIsInCart(false);
        else
            setIsInCart(true);
    }, [cart])

    let dollarString = item.itemprice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    let shouldShow = item.itemname.toLowerCase().includes(textFilter.toLowerCase())

    return (
        <div className={"column is-2 " + (shouldShow ? "" : "is-hidden")}>
            <div className="card has-background-info-light">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img className="card-image" src={item.itempic} />
                    </figure>
                </div>
                <div className="card-content">
                    <p className="title is-6">{item.itemname}</p>
                    <p className="subtitle is-7 is-pulled-left">{dollarString}</p>
                    <p className="subtitle is-7 is-pulled-right">Available: {item.amount}</p>
                </div>
                <div className="card-footer">
                    <div className="card-footer-item">
                        <CardAction
                            item={item}
                            inCart={isInCart}
                            addToCart={add}
                            removeFromCart={remove}
                            quantities={quantities}
                            setQuantity={setQuantity}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardAction = ({ item, inCart, addToCart, removeFromCart, quantities, setQuantity }) => {
    const decrement = () => {
        setQuantity(item, quantities[item.itemid] - 1);
    }

    const increment = () => {
        setQuantity(item, quantities[item.itemid] + 1);
    }

    if (inCart)
        return (
            <div className="field is-horizontal is-pulled-right">
                <div className="field-body">
                    <div className="field is-narrow has-addons">
                        <div className="control">
                            <a onClick={decrement} className="button is-small">
                                <span className="icon is-small">
                                    <i className="fas fa-minus-square"></i>
                                </span>
                            </a>
                        </div>
                        <div className="control">
                            <p className="input is-small">{quantities[item.itemid]}</p>
                        </div>
                        <div className="control">
                            <a onClick={increment} className="button is-small">
                                <span className="icon is-small">
                                    <i className="fas fa-plus-square"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="field is-narrow">
                        <div className="control">
                            <a onClick={removeFromCart} className="button is-danger is-small">
                                <span className="icon is-small">
                                    <i className="fas fa-trash"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    else
        return (
            <a onClick={addToCart} title="Add to Cart">
                <span className="icon"><i className="fas fa-plus-square"></i></span>
            </a>
        )
}