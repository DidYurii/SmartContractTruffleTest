const Horse = artifacts.require("Horse");
const Farmer = artifacts.require("Farmer");
const Dog = artifacts.require("Dog");

contract("Horse and Farmer", async () => {
  it("Horse has the correct name", async () => {
    HorseInstance = await Horse.deployed();
    let Horsename = await HorseInstance.getName();
    let name = "Boxer";
    assert.equal(Horsename, name, "the name is inccorect");
  });

  it("Horse can sleep", async () => {
    let Horsesleep = await HorseInstance.sleep();
    let sleep = "Z-z-z...";
    assert.equal(Horsesleep, sleep, "it doesn't sleep");
  });

  it("Horse can eat “plant”", async () => {
    let HorseEat = await HorseInstance.eat("plant");
    let eat = "Animal eats plant";
    assert.equal(HorseEat, eat, "it doesn't eat plant");
  });

  it("Horse cannot eat ”meat”, ”not-food”, ”plastic”", async () => {
    try {
      HorseEatMeat = await HorseInstance.eat("plant");
      HorseEatNOTFOOD = await HorseInstance.eat("not-food");
      HorseEatPlastic = await HorseInstance.eat("plastic");
      if (
        HorseEatMeat == "Animal eats plant" ||
        HorseEatNOTFOOD == "Animal eats plant" ||
        HorseEatPlastic == "Animal eats plant"
      ) {
        let meal = "Animal eats plant";
        let HorseEats = "Animal eats plant";
        assert.notEqual(meal, HorseEats, "wrong expectation");
      }
    } catch (e) {
      message = e.message;
      assert.isTrue(
        message.indexOf("revert") >= 0,
        "Expected Error message differs from what is expected"
      );
    }
  });

  it("Farmer can call Horse, Horse responds correctly", async () => {
    FarmerInstance = await Farmer.deployed();
    HorseAddress = await HorseInstance.address;
    let callHorse = await FarmerInstance.call(HorseAddress);
    let call = "Igogo";
    assert.equal(callHorse, call, "it responds incorrectly");
  });

  it("Farmer can feed Horse with plant", async () => {
    let feedHorse = await FarmerInstance.feed(HorseAddress, "plant");
    let feed = "Animal eats plant";
    assert.equal(feedHorse, feed, "expexted it should eat plant");
  });

  it("Farmer cannot feed Horse with anything else", async () => {
    try {
      feedMeat = await FarmerInstance.feed(HorseAddress, "meat");
      if (feedMeat == "Animal eats plant") {
        let HorseEats = "Animal eats plant";
        assert.notEqual(feedMeat, HorseEats, "wrong expectation");
      }
    } catch (e) {
      message = e.message;

      assert.isTrue(
        message.indexOf("revert") > 0,
        "Expected Error message differs from what is expected"
      );
    }
  });
});

contract("Dog and Farmer", async () => {
  it("Dog has the correct name", async () => {
    DogInstance = await Dog.deployed();
    let Dogname = await DogInstance.getName();
    let name = "Rex";
    assert.equal(Dogname, name, "the name is inccorect");
  });

  it("Dog can sleep", async () => {
    let Dogsleep = await DogInstance.sleep();
    let sleep = "Z-z-z...";
    assert.equal(Dogsleep, sleep, "it doesn't sleep");
  });

  it("Dog can eat “plant”", async () => {
    let DogEat = await DogInstance.eat("plant");
    let eat = "Animal eats plant";
    assert.equal(DogEat, eat, "it doesn't eat plant");
  });

  it("Dog can eat “meat”", async () => {
    let DogEat = await DogInstance.eat("meat");
    let eat = "Animal eats meat";
    assert.equal(DogEat, eat, "it doesn't eat meat");
  });

  it("Dog cannot eat ”chocolate”, ”not-food”, ”plastic”", async () => {
    try {
      DogEatChoc = await DogInstance.eat("chocolate");
      DogEatNOTFOOD = await DogInstance.eat("not-food");
      DogEatPlastic = await DogInstance.eat("plastic");
      if (
        HorseEatMeat == "Animal eats plant" ||
        HorseEatNOTFOOD == "Animal eats plant" ||
        HorseEatPlastic == "Animal eats plant"
      ) {
        let meal = "Animal eats plant";
        let DogEats = "Animal eats plant";
        assert.notEqual(meal, DogEats, "wrong expectation");
      }
    } catch (e) {
      message = e.message;
      assert.isTrue(
        message.indexOf("revert") >= 0,
        "Expected Error message differs from what is expected"
      );
    }
  });

  it("Farmer can call Dog, Dog responds correctly", async () => {
    FarmerInstance = await Farmer.deployed();
    DogAddress = await DogInstance.address;
    let callDog = await FarmerInstance.call(DogAddress);
    let call = "Woof";
    assert.equal(callDog, call, "it responds incorrectly");
  });

  it("Farmer can feed dog with plant and meat", async () => {
    let eatPlant = "Animal eats plant";
    let eatMeat = "Animal eats meat";
    let feedDogPlant = await FarmerInstance.feed(DogAddress, "plant");
    let feedDogMeat = await FarmerInstance.feed(DogAddress, "meat");
    assert.equal(feedDogMeat, eatMeat, "it doesn't eat meat");
    assert.equal(feedDogPlant, eatPlant, "it doesn't eat plant");
  });

  it("Farmer cannot feed Dog with anything else", async () => {
    try {
      feedElse = await FarmerInstance.feed(DogAddress, "plastic");
      if (feedElse == "Animal eats plant" || feedElse == "Animal eats meat") {
        let feedElse = false;
        assert.isTrue(feedElse, "wrong expectation");
      }
    } catch (e) {
      message = e.message;

      assert.isTrue(
        message.indexOf("revert") > 0,
        "Expected Error message differs from what is expected"
      );
    }
  });
});
