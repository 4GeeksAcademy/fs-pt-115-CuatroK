import { useEffect, useState } from "react"
import { getDiscount } from "../../services/serviceApi"
import { useAuth } from "../../hooks/useAuth"
import { CuponCard } from "./cuponesComponents/CuponCard"

export const Cupones = () => {
    const { token } = useAuth()
    const [couponInfo, setCouponInfo] = useState(null)

    const getCouponData = async () => {
        const data = await getDiscount(token)
        setCouponInfo(data)
    }
    console.log(couponInfo)
    useEffect(() => {
        getCouponData()
    }, [])


    return (

        <div>
            {
                !couponInfo ? (
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        <div
                            className="spinner-border text-warning"
                            role="status"
                            style={{ width: "2rem", height: "2rem" }}
                        >
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : couponInfo.length <= 0 ? (
                    <h1>Sin cupones</h1>
                ) :
                    couponInfo.map((item) => (
                        <CuponCard />
                    ))

            }

        </div>
    )
}
