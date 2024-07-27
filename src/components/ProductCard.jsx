

const ProductCard = () => {
    return (
        <div className="card mx-2 my-2" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button className="btn btn-primary">Add to Cart</button>
                <i className=" mx-2 fa-regular fa-heart"></i>
            </div>
        </div>
    )
}

export default ProductCard
