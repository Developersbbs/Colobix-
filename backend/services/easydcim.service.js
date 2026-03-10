const axios = require("axios");

const EASYDCIM_BASE_URL = process.env.EASYDCIM_URL;
const DEVICE_NAME = "colobix-dashboard";

async function loginViaEasyDCIM(email, password) {
  try {
    const response = await axios.post(
      `${EASYDCIM_BASE_URL}/login`,
      {
        email,
        password,
        device_name: DEVICE_NAME,
        token_ttl: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return {
      success: true,
      easydcimToken: response.data.data.token,
      easydcimUserId: response.data.data.id,
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 403) {
        throw {
          code: "ACCOUNT_INACTIVE",
          message: "Your account is not active. Please contact admin.",
        };
      }

      if (status === 422) {
        throw {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password.",
          errors: data.errors || {},
        };
      }
    }

    throw {
      code: "EASYDCIM_UNREACHABLE",
      message: "Authentication service is temporarily unavailable.",
    };
  }
}

module.exports = { loginViaEasyDCIM };