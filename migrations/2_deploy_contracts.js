const WildersC = artifacts.require("WildersC");
const Heroes = artifacts.require("Heroes");
const HeroesSale = artifacts.require("HeroesSale");
// const LucidLandsGem = artifacts.require("LucidLandsGem");

module.exports = async function(deployer) {
  await deployer.deploy(WildersC);
  // await deployer.deploy(LucidLandsGem);
  await deployer.deploy(Heroes).then(function() {
    return deployer.deploy(HeroesSale, Heroes.address);
  });
};
