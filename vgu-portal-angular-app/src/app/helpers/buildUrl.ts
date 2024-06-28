import { environment } from "../../environments/environment"

export const buildUrl = (path: string) => {
    return `${environment.API_URL}${environment.PREFIXED}${path}`
}