import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/backoffice/",
  headers: {
    "ngrok-skip-browser-warning": true,
  },

  
});
