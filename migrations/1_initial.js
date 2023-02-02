const StringComparer = artifacts.require("StringComparer");
const Horse = artifacts.require("Horse");
const Dog = artifacts.require("Dog");
const Farmer = artifacts.require("Farmer");

module.exports = async (deployer) => {
  await deployer.deploy(StringComparer);
  await deployer.link(StringComparer, [Horse, Dog]);
  await deployer.deploy(Horse, "Boxer");
  await deployer.deploy(Dog, "Rex");
  await deployer.deploy(Farmer);
};
