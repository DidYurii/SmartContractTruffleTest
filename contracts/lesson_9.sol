//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

interface ILiving {
    function eat(string memory food) external view returns (string memory);

    function speak() external view returns (string memory);

    function sleep() external pure returns (string memory);
}

library StringComparer {
    function compare(
        string memory str1,
        string memory str2
    ) public pure returns (bool) {
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }
}

abstract contract Animal is ILiving {
    string constant MEAT = "meat";
    string constant PLANT = "plant";

    function eat(
        string memory food
    ) public view virtual returns (string memory) {
        return string.concat("Animal eats ", food);
    }

    function sleep() public pure returns (string memory) {
        return "Z-z-z...";
    }
}

abstract contract HasName {
    string internal _name;

    constructor(string memory name) {
        _name = name;
    }

    function getName() public view returns (string memory) {
        return _name;
    }
}

abstract contract PlantEater is Animal {
    modifier eatOnlyPlant(string memory food) {
        require(StringComparer.compare(food, PLANT), "Can only eat plant food");
        _;
    }

    function eat(
        string memory food
    ) public view virtual override eatOnlyPlant(food) returns (string memory) {
        return super.eat(food);
    }
}

abstract contract MeatEater is Animal {
    modifier eatOnlyMeat(string memory food) {
        require(StringComparer.compare(food, MEAT), "Can only eat meat");
        _;
    }

    function eat(
        string memory food
    ) public view virtual override eatOnlyMeat(food) returns (string memory) {
        return super.eat(food);
    }
}

abstract contract PlantMeatEater is Animal {
    modifier eatOnlyPlantMeat(string memory food) {
        require(
            StringComparer.compare(food, MEAT) ||
                StringComparer.compare(food, PLANT),
            "Can only eat meat or plant"
        );
        _;
    }

    function eat(
        string memory food
    )
        public
        view
        virtual
        override
        eatOnlyPlantMeat(food)
        returns (string memory)
    {
        return super.eat(food);
    }
}

contract Cow is PlantEater, HasName {
    constructor(string memory name) HasName(name) {}

    function speak() public pure override returns (string memory) {
        return "Mooo";
    }
}

contract Horse is PlantEater, HasName {
    constructor(string memory name) HasName(name) {}

    function speak() public pure override returns (string memory) {
        return "Igogo";
    }
}

contract Wolf is MeatEater {
    function speak() public pure override returns (string memory) {
        return "Awooo";
    }
}

contract Dog is PlantMeatEater, HasName {
    constructor(string memory name) HasName(name) {}

    function eat(
        string memory food
    ) public view override returns (string memory) {
        require(
            !StringComparer.compare(food, "chocolate"),
            "chocolate is harmful for dog"
        );
        return super.eat(food);
    }

    function speak() public pure override returns (string memory) {
        return "Woof";
    }
}

contract Farmer {
    function feed(
        address animal,
        string memory food
    ) public view returns (string memory) {
        return ILiving(animal).eat(food);
    }

    function call(address animal) public view returns (string memory) {
        return ILiving(animal).speak();
    }
}
