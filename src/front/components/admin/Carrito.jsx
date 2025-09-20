import "../../index.css"

export const Carrito = () => {

    return (
        <div>
            <h2>Carritos</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7  me-5 mb-5 products-card p-4">
                        <h1>he</h1>
                    </div>
                    <div className="col-4  products-card p-4">
                        <h4>Total</h4>
                        <button
                            type="button"
                            className="btn btn-warning btn-warning-custom fs-5 mt-3 w-75 mx-auto d-block"
                            onClick={() => bsModalRef.current?.show()}
                        >
                            Realizar compra
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}