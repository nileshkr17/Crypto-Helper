const fetch = require("node-fetch");
const { writeFile } = require("fs");

async function updateGas() {
  setInterval(() => {
    const data = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.API_KEY}`;
    fetch(data, {
      method: "GET",
      headers: {
        apikey: process.env.API_KEY,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        let datacrypto = JSON.stringify(json, null, 2);
        writeFile("./src/coindata/ethereum.json", datacrypto, (err) => {
          if (err) throw err;
        });
      });
  }, 15000);
}
module.exports = { updateGas };
