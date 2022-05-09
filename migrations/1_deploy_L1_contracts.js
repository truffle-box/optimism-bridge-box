
var Greeter = artifacts.require("GreeterL1");

module.exports = async function(deployer) {
  console.log("Deploying L1 Greeter 👋");
  const instance = await deployer.deploy(Greeter);
};
