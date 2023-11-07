const axios = require('axios');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

// Function to get a new temporary email address

const options = (apiUrl) => ({
  method: 'GET',
  url: apiUrl,
  headers: {
    'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
    'X-RapidAPI-Host': 'privatix-temp-mail-v1.p.rapidapi.com'
  }
});

function extractConfirmationCode(text) {
  const regex = /\*\*\*(.*?)\*\*\*/;
  const match = regex.exec(text);
  if (match && match.length >= 2) {
    return match[1].trim();
  } else {
    return null;
  }
}

async function getEmail(email) {
  const md5Hash = crypto.createHash('md5').update(email).digest('hex');
  const apiUrl = `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${md5Hash}`;
  try {
    const response = await axios.request(options(apiUrl));
    const find = response.data.find((r) => r.mail_subject.includes('One more step - please confirm your email'));
    const code = extractConfirmationCode(find.mail_text);
    console.log(code);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getDomains() {
  const apiUrl = `https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/`;
  try {
    const response = await axios.request(options(apiUrl));
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// subject: "One more step - please confirm your email"
// getDomains();
getEmail('nicholas.cohen@mocvn.com');
