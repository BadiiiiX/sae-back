import { RegisterOptions } from "fastify";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

const DEFAULT_SWAGGER_URL = "localhost:3000"

function processSwaggerURL(url: string): string {
    if (!url) return DEFAULT_SWAGGER_URL

    return url.replace(/^http(s?):\/\//, "")
}

const SwaggerConfig: RegisterOptions & FastifyDynamicSwaggerOptions = {
    swagger: {
        info: {
            title: "Survey API",
            description: "Enregistrement des sondages sur la consommation de divers aliments",
            version: process.env.npm_package_version ?? "1.0.0",
            contact: {
                name: "ARAM Team",
                email: "aram@kmkz.fr",
                url: "notdefined.fr"
            }
        },
        host: processSwaggerURL(DEFAULT_SWAGGER_URL),
        schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
            { name: "User", description: "User related end-points" },
            { name: "Address", description: "Address related end-points" },
            { name: "Category", description: "Category related end-points" },
            { name: "SubCategory", description: "SubCategory related end-points" },
            { name: "SubSubCategory", description: "SubSubCategory related end-points" },
            { name: "Aliment", description: "Aliment related end-points" },
            { name: "Survey", description: "Survey related end-points" },
        ]
    },
    refResolver: {
        clone: true,
        buildLocalReference(json, baseUri, fragment, i): string {
            return json.$id.toString()
        }
    }
}

export default SwaggerConfig