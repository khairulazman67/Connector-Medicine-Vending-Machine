import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Custom Adapter Function
export const baseAdapter = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  // Modifikasi konfigurasi permintaan jika diperlukan
  config.headers = {
    ...config.headers,
    "X-Custom-Header": "CustomHeaderValue",
  };

  // Logging request details
  console.log("Request Config:", config);

  // Gunakan default Axios untuk menangani request
  const response = await axios({
    ...config,
    adapter: undefined, // Pastikan adapter default digunakan
  });

  // Logging response details
  console.log("Response:", response);

  return response;
};
