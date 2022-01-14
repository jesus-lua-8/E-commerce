import { useEffect } from "react"

export const Home = ({ setActiveTab }) => {
    useEffect(() => {
        setActiveTab("home");
    }, [])

    const goToProducts = () => {
        window.location.href = "/products";
    }

    // Add stuff inside this return area
    return (
        <>
            <div className="container has-text-centered mt-6 has-background-info">
                <div className="column is-6 is-offset-3 has-text-centered">
                    <figure className="image is-128x128 mt-2 mb-5" style={{ margin: "0 auto" }}>
                        <img src="https://freeiconshop.com/wp-content/uploads/edd/cart-outline.png"></img>
                    </figure>
                    <h1 className="title">
                        Jimbos-R-Us!
                    </h1>
                    <h2 className="subtitle">
                        Worldwide <strong>PREMIUM</strong> distribution center for all your needs!
                    </h2>
                    <div className="columns">
                        <div className="column">
                            Clothing
                        </div>
                        <div className="column">
                            Tech
                        </div>
                        <div className="column">
                            Outdoors
                        </div>
                        <div className="column">
                            Sports/Fitness
                        </div>
                    </div>
                    <div className="box">
                        <div className="field">
                            <p className="control">
                                <a onClick={goToProducts} className="button is-info">
                                    Start Shopping
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}