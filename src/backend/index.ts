import Fastify, {FastifyInstance} from "fastify";
import FastifySwagger from "@fastify/swagger"
import FastifySwaggerUI from "@fastify/swagger-ui"
import SwaggerConfig from "./swagger/config";
import consolaGlobalInstance from "consola"
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";
import * as fs from "fs";
import { resolve } from "path";
import {bootstrap} from "fastify-decorators";

export class SurveyRest {

    private static _instance: SurveyRest;
    private server: FastifyInstance
    private logger:  typeof consolaGlobalInstance

    private constructor() {
    }

    public static getInstance(): SurveyRest {
        if(!SurveyRest._instance) {
            SurveyRest._instance = new SurveyRest();
        }
        return SurveyRest._instance;
    }

    public getServer() {
        if (!this.server) {
            this.server = Fastify({
                logger: process.env.NODE_ENV === "development"
            }).withTypeProvider<TypeBoxTypeProvider>()
            .register(require('@fastify/cors'), (instance) => {
                return (req, callback) => {
                  const corsOptions = {
                    // This is NOT recommended for production as it enables reflection exploits
                    origin: true
                  };
              
                  // callback expects two parameters: error and options
                  callback(null, corsOptions)
                }
              })
        }

        return this.server;
    }

    public getLogger() {
        if (!this.logger) {
            this.logger = consolaGlobalInstance.withTag("REST");
        }
        return this.logger
    }

    private async registerServerRoutes() {
        this.getLogger().debug("Registering server routes and schemas...")

        await this.registerSchemas()

        this.getServer().register(FastifySwagger, SwaggerConfig)

        this.getServer().register(FastifySwaggerUI, {
            routePrefix: "/docs",
            uiConfig: {
                displayOperationId: true,
                persistAuthorization: true,
                syntaxHighlight: {
                    activate: true,
                    theme: "agate"
                },
                deepLinking: true
            }
        })

        this.getServer().get("/", async (request, reply) => {
            reply.redirect("/docs")
        })

        this.getServer().register(bootstrap, {
            directory: resolve(__dirname, `endpoints/controllers`),
            mask: /\.controller\./
        })

        // custom content type parser for json to allow for empty body
        this.getServer().addContentTypeParser(
            "application/json",
            { parseAs: "string" },
            (req, body, done) => {
                try {
                    if (typeof body === "string") {
                        const json = body ? JSON.parse(body) : {}
                        done(null, json)
                    }
                } catch (err) {
                    done((err as Error), undefined)
                }
            }
        )
    }

    private async registerSchemas() {
        const schemas = fs.readdirSync(resolve(__dirname, "schemas"))
        for (const schema of schemas) {
            const schemaName = schema.split(".")[0]
            const schemaContent = await import(`./schemas/${schema}`)
            this.getServer().addSchema(schemaContent.default)
            this.getLogger().debug(
                `Registered schema ${schemaName} to Fastify server`
            )
        }
    }



    public async start() {
        await this.registerServerRoutes();
        const port = process.env.SERVER_PORT ?? '3000';

        this.getServer()
            .listen({
                port: parseInt(port),
                host: process.env.SERVER_HOST || "127.0.0.1"
            })
            .then((address) => {
                this.getLogger().ready(`Fastify server running @ ${address}`)
            })
            .catch((err) => {
                this.getLogger().error(`Fastify server failed to start:`, err)
            })
    }
}