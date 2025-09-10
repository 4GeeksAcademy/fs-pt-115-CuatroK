import { useEffect, useState } from "react"
import { DatosPersonales } from "../../components/admin/DatosPersonales"
import { Seguridad } from "../../components/admin/Seguridad"
import "../../index.css"
import { getUser } from "../../services/serviceApi"

export const Profile = () => {
    const [isActive, setIsActive] = useState("Datos personales")
    const [userName, setUserName] = useState(null)
    const [addressDataError, setAddressDataError] = useState()
    const [user, setUser] = useState()

    const addressDataMissing = (addressMissing) => {
        setAddressDataError(addressMissing)
    }

    const getUserApi = async () => {
        const data = await getUser(addressDataError)
        setUser(data)
    }
    useEffect(() => {
        getUserApi()
    }, [])

    useEffect(() => {
        if (user) setUserName(user.username)
    }, [user])

    if (!user) {

        return (<h1>CARGANDO</h1>)
    }

    return (
        <div className="mt-5 container-fluid ">
            <h1 className="text-center my-5">Hello, {userName ?? ""} </h1>
            <div className="row justify-content-center gap-5 ">

                <div class="list-group  col-3 border border-dark p-0" style={{ "height": "100%" }}>
                    <button type="button" onClick={(e) => setIsActive(e.target.innerText)} class={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Datos personales" ? "active" : ""}`}>
                        Datos personales
                    </button>
                    <button type="button" onClick={(e) => setIsActive(e.target.innerText)} class={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Seguridad" ? "active" : ""}`}>Seguridad</button>
                    <button type="button" onClick={(e) => setIsActive(e.target.innerText)} class={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Historial de pedidos" ? "active" : ""}`}>Historial de pedidos</button>
                    <button type="button" onClick={(e) => setIsActive(e.target.innerText)} class={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Carrito" ? "active" : ""}`}>Carrito</button>
                    <button type="button" onClick={(e) => setIsActive(e.target.innerText)} class={`list-group-item list-group-item-action border-bottom border-end-0 border-start-0 border-secondary fs-3 profile-options-background ${isActive == "Cupones" ? "active" : ""}`}>Cupones</button>
                    <button type="button" onClick={(e) => setIsActive(e.target.innerText)} class={`list-group-item list-group-item-action fs-3 profile-options-background ${isActive == "Favoritos" ? "active" : ""}`}>Favoritos</button>
                </div>

                <div className="col-8 ">
                    {
                        isActive == "Datos personales" ?
                            <DatosPersonales
                                user={user}
                                setUserName={setUserName}
                                getUserApi={getUserApi}
                            /> :
                            isActive == "Seguridad" ?
                                <Seguridad /> :
                                isActive == "Historial de pedidos" ?
                                    <h1>Historial de pedidos</h1> :
                                    <h2>Carritos</h2>
                    }
                </div>
            </div>
        </div>
    )
}