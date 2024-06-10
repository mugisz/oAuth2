const accounts = require("../data/accounts.json");

// Get account by ID
const getAccount = (req, res) => {
  const accountId = req.params.id;
  const account = accounts.find((acc) => acc.id === accountId);

  if (account) {
    res.json(account);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

const updateAccount = (req, res) => {
  const accountId = req.params.id;
  const { address } = req.body;

  const accountIndex = accounts.findIndex((acc) => acc.id === accountId);

  if (accountIndex !== -1) {
    accounts[accountIndex].address = address;
    res.json(accounts[accountIndex]);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

module.exports = { getAccount, updateAccount };
