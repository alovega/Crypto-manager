const fetch = require('node-fetch');

export async function cryptoToUSD(tokenName) {
  try {
    let url = new URL(process.env.CRYPTOCOMPARE_URL);
    url.search = new URLSearchParams({
      fsym: tokenName,
      tsyms: 'USD',
      api_key: process.env.CRYPTOCOMPARE_API_KEY,
    }).toString();
    let response = await fetch(url);
    if (response.ok) {
      response = await response.json();
      if (response.Response === 'Error') {
        throw new Error(response.Message);
      }
      return response.USD;
    }
  } catch (err) {
    console.log(err);
  }
};

