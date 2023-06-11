import {SondageRest} from "./backend";
import consolaGlobalInstance from "consola";

(async () => {
    consolaGlobalInstance.info(
        `Initializing server on the ${process.env.NODE_ENV} environment...`
    )

    const server = SondageRest.getInstance()
    await server.start();
})();