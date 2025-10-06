import { useState, useEffect, useRef } from "react"
import { createAddress } from "../../../services/serviceApi"
import "../../../index.css"
import "../profile.css"

export const AddressModal = ({ getUserApi }) => {
    const [addressInfo, setAddressInfo] = useState({
        first_address: "",
        second_address: "",
        postal_code: "",
        city: "",
        province: "",
        phone: "",
    })
    const [errorMsg, setErrorMsg] = useState("")
    const bsModalRef = useRef(null)
    const modalElementRef = useRef(null)

    const HandleAddressOnChange = (e) => {
        const { name, value } = e.target
        setAddressInfo((prev) => ({ ...prev, [name]: value }))
    }

    const CreateAddress = async () => {
        try {
            setErrorMsg("")
            await createAddress(addressInfo)
            await getUserApi()

            // ✅ Cerrar el modal después de guardar
            bsModalRef.current?.hide()
        } catch (error) {
            setErrorMsg("Faltan espacios por rellenar")
            console.error(error)
            // Opcional: mantener consistente el estado interno
            if (bsModalRef.current) {
                bsModalRef.current._isShown = true
            }
        }

    }

    const HandleOnSubmit = (e) => {
        e.preventDefault()
        CreateAddress()
    }

    useEffect(() => {
        const element = modalElementRef.current
        if (!element) return

        bsModalRef.current = new window.bootstrap.Modal(element, {
            backdrop: "static",
            keyboard: false,
        })

        const handler = () => {
            setAddressInfo({
                first_address: "",
                second_address: "",
                postal_code: "",
                city: "",
                province: "",
                phone: "",
            })
            setErrorMsg("")
        }

        element.addEventListener("hidden.bs.modal", handler)

        return () => {
            element.removeEventListener("hidden.bs.modal", handler)
            bsModalRef.current?.dispose()
        }
    }, [])

    return (
        <div className="w-100 products-card p-4 profile-form">
            <button
                type="button"
                className="btn btn-warning btn-warning-custom fs-5 mt-3 modal-body w-50 mx-auto d-block "
                onClick={() => bsModalRef.current?.show()}
            >
                Agregar nueva dirección
            </button>

            <div
                ref={modalElementRef}
                className="modal fade"
                id="staticBackdrop"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Nueva dirección
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => bsModalRef.current?.hide()}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form
                                className="profile-form container py-4 px-4"
                                onSubmit={HandleOnSubmit}
                            >
                                <div className="row px-4">
                                    <div className="col-6">
                                        <h3>Línea de dirección 1. *</h3>
                                        <div className="input-group input-group-sm mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errorMsg && !addressInfo.first_address ? "input-data-missing" : ""}`}
                                                name="first_address"
                                                value={addressInfo.first_address}
                                                onChange={HandleAddressOnChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row px-4">
                                    <div className="col-6">
                                        <h3>Línea de dirección 2.</h3>
                                        <div className="input-group input-group-sm mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="second_address"
                                                value={addressInfo.second_address}
                                                onChange={HandleAddressOnChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row px-4">
                                    <div className="col-6">
                                        <h3>Código postal. *</h3>
                                        <div className="input-group input-group-sm mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errorMsg && !addressInfo.postal_code ? "input-data-missing" : ""}`}
                                                name="postal_code"
                                                value={addressInfo.postal_code}
                                                onChange={HandleAddressOnChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 ms-auto">
                                        <h3>Ciudad. *</h3>
                                        <div className="input-group input-group-sm mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errorMsg && !addressInfo.city ? "input-data-missing" : ""}`}
                                                name="city"
                                                value={addressInfo.city}
                                                onChange={HandleAddressOnChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row px-4">
                                    <div className="col-6">
                                        <h3>Provincia. *</h3>
                                        <div className="input-group input-group-sm mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errorMsg && !addressInfo.province ? "input-data-missing" : ""}`}
                                                name="province"
                                                value={addressInfo.province}
                                                onChange={HandleAddressOnChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 ms-auto">
                                        <h3>Teléfono. *</h3>
                                        <div className="input-group input-group-sm mb-3">
                                            <input
                                                type="text"
                                                className={`form-control ${errorMsg && !addressInfo.phone ? "input-data-missing" : ""}`}
                                                name="phone"
                                                value={addressInfo.phone}
                                                onChange={HandleAddressOnChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {errorMsg && (
                                    <div className="alert alert-danger text-danger mt-2 text-center" role="alert">{errorMsg}</div>
                                )}

                                <button type="submit" className="btn btn-warning fs-5 mt-3">
                                    Guardar
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}