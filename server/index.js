require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ethers = require('ethers');
const fetch = require('node-fetch').default;

const app = express();

const privateKey = process.env.PRIVATE_KEY;
const nodeURL = process.env.GOERLI_NODE;

const provider = new ethers.providers.JsonRpcProvider(nodeURL);
const wallet = new ethers.Wallet(privateKey, provider);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.post("/sendfund", async (req, res) => {
  try {
    const to = req.body.to;
    const amount = req.body.amount;

    const gasPrice = await provider.getGasPrice();

    const tx = {
      from: wallet.address,
      to: to,
      value: ethers.utils.parseUnits(amount, "ether"),
      gasPrice: gasPrice,
      gasLimit: ethers.utils.hexlify(100000),
      nonce: await provider.getTransactionCount(
        wallet.address,
        "latest"
      )
    }
  
    const transaction = await wallet.sendTransaction(tx);
    const data = await transaction.wait();

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/verifyproof", async (req, res) => {
  const reqBody = {
    merkle_root: req.body.merkle_root,
    nullifier_hash: req.body.nullifier_hash,
    proof: req.body.proof,
    credential_type: req.body.credential_type,
    action: req.body.action,
    signal: req.body.signal ?? "",
  };
  fetch(`https://developer.worldcoin.org/api/v1/verify/${process.env.WLD_APP_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody), 
  }).then((verifyRes) => {
    verifyRes.json().then(async (wldResponse) => {
      if (verifyRes.status == 200) {
        const to = req.body.to;
        const amount = req.body.amount;

        const gasPrice = await provider.getGasPrice();

        const tx = {
          from: wallet.address,
          to: to,
          value: ethers.utils.parseUnits(amount, "ether"),
          gasPrice: gasPrice,
          gasLimit: ethers.utils.hexlify(100000),
          nonce: await provider.getTransactionCount(
            wallet.address,
            "latest"
          )
        }
      
        const transaction = await wallet.sendTransaction(tx);
        const data = await transaction.wait();

        res.json(data);
      } else {
        res.status(verifyRes.status).send({ 
          code: wldResponse.code, 
          detail: wldResponse.detail 
        });
      }
    });
  });
})

app.get('/', (req, res) => res.send('It Work'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 