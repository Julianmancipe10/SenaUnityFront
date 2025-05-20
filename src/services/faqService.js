import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/faq";

export const preguntarFAQ = async (question) => {
  try {
    const res = await axios.post(API_URL, { question });
    return res.data.answer;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de error
      throw new Error(error.response.data.error || "Error en el servidor");
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new Error("No se pudo conectar con el servidor");
    } else {
      // Error al configurar la petición
      throw new Error("Error al procesar la solicitud");
    }
  }
};
