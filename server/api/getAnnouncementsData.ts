import initialConfig from "../../config/initial.config";
import axios from "axios";

export default defineEventHandler(async (event) => {
    const destination = initialConfig.api.announcements;
    const response = await axios.get(destination).catch((err) => {
        return err.response;
    });
    console.debug(`${destination} -> ${response?.statusText}`);
    return response?.data || "";
})