import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    const coffee = this.coffees.find(coffee => coffee.id === id);
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);

    return createCoffeeDto;
  }

  update(id: number, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);

    if (existingCoffee) {
      // Update the existing entity
    }
  }

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex(coffee => coffee.id === id);

    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
