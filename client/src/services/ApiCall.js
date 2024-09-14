import axios from "axios";

export const commonrequest = async (methods, url, body, header) => {
  let config = {
    method: methods,
    url,
    headers: header
      ? header // if a header is provided, use it
      : {
          "Content-Type": "application/json", // default headers
        },
    data: body,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with error:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return { message: "No response received", request: error.request };
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error in setting up request:", error.message);
      return { message: error.message };
    }
  }
};
