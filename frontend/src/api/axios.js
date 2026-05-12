import axios from "axios";

const API = axios.create({
    baseURL: "https://studysync-ngqu.onrender.com",
});

export default API;