import initialConfig from "../../config/initial.config";
import axios from "axios";

export default defineEventHandler(async (event) => {
    const id = getQuery(event).id || "null";
    const destination = initialConfig.api.project.replace("{id}", id.toString().trim());
    const response = await axios.get(destination).catch(function (err) {
        if (err.response) {
            if (err.response.status === 500) {
                console.error("Error in getting projects", err);
            }
        }
        return err.response;
    });

    console.debug(`${destination} -> ${response?.statusText}`);
    return response?.data
})