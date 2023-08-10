require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ethers = require('ethers');

const app = express();

const privateKey = process.env.PRIVATE_KEY;
const nodeURL = process.env.GOERLI_NODE;

const provider = new ethers.providers.JsonRpcProvider(nodeURL);
const wallet = new ethers.Wallet(privateKey, provider);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get("/sendfund", async (req, res) => {
  try {
    // const to = req.body.to;
    // const amount = req.body.amount;

    const gasPrice = await provider.getGasPrice();

    const tx = {
      from: wallet.address,
      to: wallet.address,
      value: ethers.utils.parseUnits("0.0001", "ether"),
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

app.get('/', (req, res) => res.send('It Work'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 