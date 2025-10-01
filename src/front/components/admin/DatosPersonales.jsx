import { useState, useEffect } from "react";
import { updateAddressData, updateUserData } from "../../services/serviceApi";
import "../../index.css";
import "../button.css";
import { Address } from "./datosPersonalesComponents/Address";
import { AddressModal } from "./datosPersonalesComponents/AddressModal";


export const DatosPersonales = ({ user, getUserApi }) => {
    const [userInfo, setUserInfo] = useState({
        full_name: user.full_name ?? "",
        username: user.username ?? "",
        gender: user.gender ?? "",
        birth_date: user.birth_date ?? "",
    });
    const [birth, setBirth] = useState({ day: "", month: "", year: "" });
    const [dataMissingError, setDataMissingError] = useState(false);
    const [dataToSubmit, setDataToSubmit] = useState(false);

    const SendDataUpdated = async () => {
        if (userInfo.username.trim().length < 3) {
            setDataMissingError(true);
            return;
        }

        setDataMissingError(false);

        const birth_date =
            birth.day && birth.month && birth.year
                ? `${birth.year}-${String(birth.month).padStart(2, "0")}-${String(birth.day).padStart(2, "0")}`
                : "";

        const dataToSend = {
            username: userInfo.username,
            full_name: userInfo.full_name,
            gender: userInfo.gender,
            birth_date,
        };

        try {
            await updateUserData(dataToSend, getUserApi);
        } catch (error) {
            console.error(error);
        }
    };

    const HandleProfileKeyDown = (e) => {
        if (e.key === "Enter") {
            SendDataUpdated();
            setDataToSubmit(false);
        }
    };

    const HandleOnClick = () => {
        SendDataUpdated();
        setDataToSubmit(false);
    };

    const HandleProfileOnChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
        setDataToSubmit(true);
    };

    const HandleSelectors = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
        setDataToSubmit(true);
    };

    const HandleBirthDate = (e) => {
        const { name, value } = e.target;
        setBirth((prev) => {
            const updated = { ...prev, [name]: value };

            if (updated.day && updated.month && updated.year) {
                setDataMissingError(false);
            } else {
                setDataMissingError(true);
            }

            setDataToSubmit(true);
            return updated;
        });
    };

    useEffect(() => {
        if (user.birth_date) {
            const [year, month, day] = user.birth_date.split("-");
            setUserInfo({
                full_name: user.full_name ?? "",
                username: user.username ?? "",
                gender: user.gender ?? "",
                birth_date: user.birth_date,
            });
            setBirth({ day, month, year });
        } else {
            setUserInfo({
                full_name: user.full_name ?? "",
                username: user.username ?? "",
                gender: user.gender ?? "",
                birth_date: "",
            });
            setBirth({ day: "", month: "", year: "" });
        }
    }, [user]);

    return (
        <>
            <div className="profile-form container py-4 px-3">
                <div className="row  px-4">
                    <div className="col-6">
                        <h4>Nombre completo</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className={`form-control`}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                name="full_name"
                                onChange={HandleProfileOnChange}
                                value={userInfo.full_name ?? ""}
                                onKeyDown={HandleProfileKeyDown}
                            />

                        </div>
                    </div>
                    <div className="col-6 ms-auto">
                        <h4>Nombre de usuario</h4>
                        <div className="input-group input-group-sm mb-3">
                            <input
                                type="text"
                                className={`form-control ${userInfo.username.trim().length < 3
                                    ? "input-data-missing"
                                    : ""
                                    }`}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-sm"
                                name="username"
                                onChange={HandleProfileOnChange}
                                value={userInfo.username ?? ""}
                                onKeyDown={HandleProfileKeyDown}
                            />
                            {userInfo.username.trim().length < 3 && (
                                <div
                                    className="bg-danger text-white p-2 rounded"
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        zIndex: 10,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <i className="fa-solid fa-circle-exclamation me-1"></i>
                                    Tu nombre de usuario debe tener al menos 3 caracteres
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row  px-4">
                    <div className="col-6">
                        <h4>Género</h4>
                        <div className="input-group input-group-sm mb-3">
                            <select
                                className="form-control"
                                name="gender"
                                onChange={HandleSelectors}
                                value={userInfo.gender}
                            >
                                <option value="">Selecciona...</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                                <option value="non-binary">No binario</option>
                                <option value="genderqueer">Genderqueer</option>
                                <option value="genderfluid">Género fluido</option>
                                <option value="Demagogo">Demagogo 🎆</option>
                                <option value="agender">Agénero</option>
                                <option value="bigender">Bigénero</option>
                                <option value="demiboy">Demiboy</option>
                                <option value="demigirl">Demigirl</option>
                                <option value="androgyne">Andrógino</option>
                                <option value="two-spirit">Dos espíritus</option>
                                <option value="pangender">Pangénero</option>
                                <option value="neutrois">Neutrois</option>
                                <option value="trans">Trans</option>
                                <option value="enby">Enby</option>
                                <option value="Femboy">Femboy</option>
                                <option value="dinosaur">Dinosaurio 🦖</option>
                                <option value="gato">Gato 🐱</option>
                                <option value="perrito">Bellaco 🐶</option>
                                <option value="npc-sin-propósito">NPC sin propósito 🎭</option>
                                <option value="kpop">Fan de Taylor 💜</option>
                                <option value="shrek">Fan de Travis 🧅</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6 ms-auto">
                        <h4>Fecha de nacimiento</h4>

                        <div className="d-flex gap-2">
                            <select
                                className={`form-control ${dataMissingError && !birth.day ? "input-data-missing" : ""
                                    }`}
                                name="day"
                                onChange={HandleBirthDate}
                                value={birth.day ?? ""}
                            >
                                <option value="" disabled hidden>
                                    Día
                                </option>
                                {[...Array(31)].map((_, i) => {
                                    const val = String(i + 1).padStart(2, "0");
                                    return (
                                        <option key={val} value={val}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                className={`form-control ${dataMissingError && !birth.month
                                    ? "input-data-missing"
                                    : ""
                                    }`}
                                name="month"
                                onChange={HandleBirthDate}
                                value={birth.month ?? ""}
                            >
                                <option value="" disabled hidden>
                                    Mes
                                </option>
                                {[
                                    "Enero",
                                    "Febrero",
                                    "Marzo",
                                    "Abril",
                                    "Mayo",
                                    "Junio",
                                    "Julio",
                                    "Agosto",
                                    "Septiembre",
                                    "Octubre",
                                    "Noviembre",
                                    "Diciembre",
                                ].map((m, i) => {
                                    const val = String(i + 1).padStart(2, "0");
                                    return (
                                        <option key={val} value={val}>
                                            {m}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                className={`form-control ${dataMissingError && !birth.year ? "input-data-missing" : ""
                                    }`}
                                name="year"
                                onChange={HandleBirthDate}
                                value={birth.year ?? ""}
                            >
                                <option value="" disabled hidden>
                                    Año
                                </option>
                                {Array.from({ length: 100 }, (_, i) =>
                                    String(new Date().getFullYear() - i)
                                ).map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {dataToSubmit && (
                    <button className="btn btn-warning fs-5 " onClick={HandleOnClick}>
                        Guardar
                    </button>
                )}
            </div>
            <div className="profile-addresses">

                <h2 className="mt-5">Direcciones</h2>
                <AddressModal getUserApi={getUserApi} />
                {user.address?.map((a, index) => (
                    <Address

                        key={a.id}
                        id={index}
                        user={user}
                        updateAddressData={updateAddressData}
                        getUserApi={getUserApi}
                    />
                ))}
            </div>
        </>
    );
};
