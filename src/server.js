import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,

        models: {
            user: Model,
        },

        seeds(server) {
            server.create("user", { username: "collinsnyamao", password: "123456789" })
            server.create("user", { username: "Alice", password: "123456789" })
        },

        routes() {
            this.namespace = "api"

            this.get("/users", (schema) => {
                return schema.users.all()
            })
        },
    })

    return server
}