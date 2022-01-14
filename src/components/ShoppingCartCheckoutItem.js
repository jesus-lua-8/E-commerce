export const ShoppingCartCheckoutItem = ({ item, removeFromCart, quantities, setQuantity }) => {
    const remove = () => {
        removeFromCart(item);
    }

    const decrement = () => {
        setQuantity(item, quantities[item.itemid] - 1);
    }

    const increment = () => {
        setQuantity(item, quantities[item.itemid] + 1);
    }

    let dollarString = item.itemprice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });

    return (
        <div className="column is-full">
            <div className="columns is-vcentered">
                <div className="column is-2">
                    <figure className="image is-48x48">
                        <img src={item.itempic}></img>
                    </figure>
                </div>
                <div className="column is-4">
                    <strong className="is-pulled-left">{item.itemname}</strong>
                </div>
                <div className="column is-2">
                    <p className="is-pulled-right">{dollarString} * {quantities[item.itemid]}</p>
                </div>
                <div className="column">
                    <div className="field is-horizontal is-pulled-right">
                        <div className="field-body">
                            <div className="field is-narrow has-addons">
                                <div className="control">
                                    <a onClick={decrement} className="button">
                                        <span className="icon is-small">
                                            <i className="fas fa-minus-square"></i>
                                        </span>
                                    </a>
                                </div>
                                <div className="control">
                                    <p className="input">{quantities[item.itemid]}</p>
                                </div>
                                <div className="control">
                                    <a onClick={increment} className="button">
                                        <span className="icon is-small">
                                            <i className="fas fa-plus-square"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="field is-narrow">
                                <div className="control">
                                    <a onClick={remove} className="button is-danger">
                                        <span className="icon">
                                            <i className="fas fa-trash"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}