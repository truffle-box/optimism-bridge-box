
var Greeter = artifacts.require("Greeter");

module.exports = async function(deployer) {
  console.log("Deploying L1 Greeter 👋");
  const instance = await deployer.deploy(Greeter);
};
