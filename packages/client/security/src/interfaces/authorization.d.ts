declare interface Authorization {
    scheme?: string
    credentials?: string
    basic?: {
        username: string
        password: string
    }
}