import { useState, useEffect } from "react";
import { updateAddressData, updateUserData } from "../../services/serviceApi";
import "../../index.css";
import "../button.css";
import { Address } from "./datosPersonalesComponents/Address";
import { AddressModal } from "./datosPersonalesComponents/AddressModal";
import { Link } from "react-router-dom";

export const DatosPersonales = ({ user, getUserApi }) => {
    const [userInfo, setUserInfo] = useState({
        full_name: user.full_name ?? "",
        username: user.username ?? "",
        gender: user.gender ?? "",
        birth_date: user.birth_date ?? "",
    });
    const [dataMissingError, setDataMissingError] = useState(false);
    const [dataToSubmit, setDataToSubmit] = useState(false);

    const SendDataUpdated = async (userInfo) => {
        if (userInfo.full_name.trim().length < 5) {
            return console.log("muy corto");
        }
        if (userInfo.username.trim().length < 3) {
            return console.log("muy corto");
        }
        const dataToSend = {
            username: userInfo.username,
            full_name: userInfo.full_name,
            gender: userInfo.gender,
            birth_date: userInfo.birth_date,
        };
        await updateUserData(dataToSend);
    };

    const HandleProfileKeyDown = (e) => {
        if (e.key == "Enter") {
            SendDataUpdated(userInfo);
            setDataToSubmit(false);
        }
    };

    const HandleOnClick = () => {
        SendDataUpdated(userInfo);
        setDataToSubmit(false);
    };

    const HandleProfileOnChange = (e) => {
        const { name, value } = e.target;

        setDataMissingError(false);
        setDataToSubmit(true);
        let updatedUser = { ...userInfo, [name]: value };

        setUserInfo(updatedUser);
    };

    const HandleSelectors = (e) => {
        const { name, value } = e.target;
        let updatedUser = { ...userInfo, [name]: value };

        setUserInfo(updatedUser);
        SendDataUpdated(updatedUser);
    };

    const HandleBirthDate = (e) => {
        const { name, value } = e.target;
        let updatedUser = { ...userInfo, [name]: value };

        if (["day", "month", "year"].includes(name)) {
            const { day, month, year } = updatedUser;

            if (day && month && year) {
                updatedUser.birth_date = `${year}-${String(month).padStart(
                    2,
                    "0"
                )}-${String(day).padStart(2, "0")}`;
                setDataMissingError(false);
                SendDataUpdated(updatedUser);
            } else {
                updatedUser.birth_date = "";
                setDataMissingError(true);
            }
        }

        setUserInfo(updatedUser);
    };

    useEffect(() => {
        if (user.birth_date) {
            const [year, month, day] = user.birth_date.split("-");
            setUserInfo({
                full_name: user.full_name ?? "",
                username: user.username ?? "",
                gender: user.gender ?? "",
                birth_date: user.birth_date,
                day,
                month,
                year,
            });
        } else {
            setUserInfo({
                full_name: user.full_name ?? "",
                username: user.username ?? "",
                gender: user.gender ?? "",
                birth_date: "",
                day: "",
                month: "",
                year: "",
            });
        }
    }, [user]);


    return (
        <>
            <div className="products-card container py-4 px-4">
                <div className="row  px-4">
                    <div className="col-6">
                        <h3>Nombre completo</h3>
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
                        <h3>Nombre de usuario</h3>
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
                        <h3>Género</h3>
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
                                <option value="other">Otro</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6 ms-auto">
                        <h3>Fecha de nacimiento</h3>

                        <div className="d-flex gap-2">
                            <select
                                className={`form-control ${dataMissingError && !userInfo.day ? "input-data-missing" : ""
                                    }`}
                                name="day"
                                onChange={HandleBirthDate}
                                value={userInfo.day ?? ""}
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
                                className={`form-control ${dataMissingError && !userInfo.month
                                    ? "input-data-missing"
                                    : ""
                                    }`}
                                name="month"
                                onChange={HandleBirthDate}
                                value={userInfo.month ?? ""}
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
                                className={`form-control ${dataMissingError && !userInfo.year ? "input-data-missing" : ""
                                    }`}
                                name="year"
                                onChange={HandleBirthDate}
                                value={userInfo.year ?? ""}
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
        </>
    );
};
