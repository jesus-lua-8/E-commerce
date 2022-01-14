import { useEffect, useState } from "react";

import { ItemCard } from "../components/ItemCard";


export const Products = ({ setActiveTab, cart, addToCart, removeFromCart, textFilter, quantities, setQuantity }) => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        let request = {
            method: "GET"
        };

        let resp = await fetch("/api/items", request);
        let resp_json;
        if (resp.ok)
            resp_json = await resp.json();
        else
            return;

        setItems(resp_json.result.sort((a, b) => {
            return a.itemname > b.itemname ? 1 : -1;
        }));
    }

    useEffect(() => {
        setActiveTab("products");
        fetchItems();
    }, []);

    return (
        <div className="container">
            <div className="columns is-multiline">
                {
                    items.map((item) => (
                        <ItemCard
                            key={item.itemid}
                            item={item}
                            cart={cart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            textFilter={textFilter}
                            quantities={quantities}
                            setQuantity={setQuantity}
                        />
                    ))
                }
            </div>
        </div>
    )
}