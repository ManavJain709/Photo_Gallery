import { useContext } from "react"
import { FamilyContext } from "../_context"

export const useFamily = () => {
    return useContext(FamilyContext)
}
