import { useAuth } from "../../hooks/useAuth"
import { ChangePassword } from "../../services/serviceApi"

export const ProccessToResetPassword = () => {
    const { user } = useAuth()
    console.log(user)
    return (
        <>
            <h1>Hello</h1>
            <p>haz click <span className="text-primary" onClick={() => ChangePassword(user.email)} style={{ cursor: "pointer" }}>aquí </span> para enviar un correo de reestablecer tu contraseña</p>
        </>
    )
}