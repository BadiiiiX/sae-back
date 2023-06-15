import {SurveyRest} from "./backend";
import consolaGlobalInstance from "consola";

(async () => {
    consolaGlobalInstance.info(
        `Initializing server on the ${process.env.NODE_ENV ?? "developement"} environment...`
    )

    const server = SurveyRest.getInstance()
    await server.start();
})();