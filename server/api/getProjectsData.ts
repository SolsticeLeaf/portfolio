import initialConfig from "../../config/initial.config";
import axios from "axios";

export default defineEventHandler(async (event) => {
    const destination = initialConfig.api.projects;
    const response = await axios.get(destination);
    return response.data
})