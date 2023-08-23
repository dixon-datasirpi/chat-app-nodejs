
const axios = require('axios');


exports.getUsersFromKeyCloak = async (token) => {
    try {
        const payload = {
            username: "francis@datasirpi.com",
            password: "1Zq5U&27u87zc`ri<!m29l"
        };
        const url = "https://soc360-dev-backend.trojanae.com/auth/login";
        const bearerToken = token;
        const headers = {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        };

        const response = await axios.post(url, payload, { headers });
        const accessToken = response.data.payload.body.access_token;
        const userHeaders = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const urlForUsers = "https://soc360-dev-backend.trojanae.com/user/management/get/users/list?first=0&max=100";

        const usersResponse = await axios.get(urlForUsers, { headers: userHeaders });
        const users = usersResponse.data;

        return users;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
};
