import { useEffect, useState } from "react"
import { deleteAddress, updateAddressData } from "../../../services/serviceApi"
import DeleteButton from "./DeleteButton"

import { DeleteText } from "../../effects/DeleteText";

export const Address = ({ id, user, getUserApi }) => {
    const [addressInfo, setAddressInfo] = useState({
        first_address: user.address[id].first_address ?? "",
        second_address: user.address[id].second_address ?? "",
        postal_code: user.address[id].postal_code ?? "",
        city: user.address[id].city ?? "",
        province: user.address[id].province ?? "",
        phone: user.address[id].phone ?? "",
    })

    const [isBeingDeleted, setIsBeingDeleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const SendAddressDataUpdated = async () => {
        if (!addressInfo.first_address || !addressInfo.postal_code || !addressInfo.city || !addressInfo.province || !addressInfo.phone) {
            setErrorMsg("Faltan espacios por rellenar");
            return;
        }
        try {
            setErrorMsg("")
            await updateAddressData(addressInfo, id)
            await getUserApi()
            setIsEditing(false)

        } catch (error) {
            setErrorMsg("Faltan espacios por rellenar")
            console.error(error)
        }
    }

    const DeleteAddress = async () => {
        setIsBeingDeleted(true)
        setIsEditing(!isEditing)
        await deleteAddress(id)
        await getUserApi()
    }

    const HandleIconOnClick = async () => {
        await getUserApi()
        setErrorMsg("")
        setIsEditing(!isEditing)
    }

    const HandleOnChange = (e) => {
        const { name, value } = e.target
        setAddressInfo({ ...addressInfo, [name]: value })
    }

    const HandleOnSubmit = (e) => {
        e.preventDefault()
        SendAddressDataUpdated()
    }


    useEffect(() => {
        setAddressInfo({
            first_address: user.address[id].first_address ?? "",
            second_address: user.address[id].second_address ?? "",
            postal_code: user.address[id].postal_code ?? "",
            city: user.address[id].city ?? "",
            province: user.address[id].province ?? "",
            phone: user.address[id].phone ?? ""
        })
    }, [user])

    return (
        <div className="mb-3 ">
            {/* 🔹 Overlay de cargando */}
            {isBeingDeleted && <DeleteText />}

            <div
                className="d-flex justify-content-end mb-2 align-items-center"
                onClick={HandleIconOnClick}   // clic en cualquier parte del div
                style={{ cursor: "pointer" }} // cursor tipo mano
            >
                <span className="me-2 text-center mb-0 pt-1 text-decoration-underline">
                    Editar
                </span>
                <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </div>

            <form
                className={`profile-form ${!isEditing ? "disabled-section" : ""} px-3`}
                onSubmit={(e) => HandleOnSubmit(e)}
            >
                <div className="row px-4">
                    <div className="col-6">
                        <h4>Línea de dirección 1. *</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className={`form-control ${errorMsg && !addressInfo.first_address ? "input-data-missing" : ""
                                    }`}
                                name="first_address"
                                value={addressInfo.first_address ?? ""}
                                onChange={HandleOnChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                <div className="row px-4">
                    <div className="col-6">
                        <h4>Línea de dirección 2.</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="second_address"
                                value={addressInfo.second_address ?? ""}
                                onChange={HandleOnChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                <div className="row px-4">
                    <div className="col-6">
                        <h4>Código postal. *</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className={`form-control ${errorMsg && !addressInfo.postal_code ? "input-data-missing" : ""
                                    }`}
                                name="postal_code"
                                value={addressInfo.postal_code ?? ""}
                                onChange={HandleOnChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="col-6 ms-auto">
                        <h4>Ciudad. *</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className={`form-control ${errorMsg && !addressInfo.city ? "input-data-missing" : ""
                                    }`}
                                name="city"
                                value={addressInfo.city ?? ""}
                                onChange={HandleOnChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                <div className="row px-4">
                    <div className="col-6">
                        <h4>Provincia. *</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className={`form-control ${errorMsg && !addressInfo.province ? "input-data-missing" : ""
                                    }`}
                                name="province"
                                value={addressInfo.province ?? ""}
                                onChange={HandleOnChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="col-6 ms-auto">
                        <h4>Teléfono. *</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className={`form-control ${errorMsg && !addressInfo.phone ? "input-data-missing" : ""
                                    }`}
                                name="phone"
                                value={addressInfo.phone ?? ""}
                                onChange={HandleOnChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    {errorMsg && (
                        <div
                            className="error-tooltip text-center mt-2"
                        >
                            {errorMsg}
                        </div>
                    )}

                    <div className="d-flex justify-content-between mt-3">
                        <button
                            type="submit"
                            className="btn btn-warning fs-5"
                            disabled={!isEditing}
                        >
                            Guardar
                        </button>
                        <DeleteButton DeleteAddress={DeleteAddress} />
                    </div>
                </div>
            </form>
        </div>
    )
}