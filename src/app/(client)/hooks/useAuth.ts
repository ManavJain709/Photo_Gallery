import { useContext } from "react"
import { AuthContext } from "../_context"

export const useAuth = () => {
    return useContext(AuthContext)
}
