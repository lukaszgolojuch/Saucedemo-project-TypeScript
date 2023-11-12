class Product {
  constructor(
    public readonly productName: string,
    public readonly description: string,
    public readonly price: number,
  ) {}
}

export const Products = {
  SAUCE_LABS_BACKPACK: new Product(
    "Sauce Labs Backpack",
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    29.99,
  ),
  SAUCE_LABS_BIKE_LIGHT: new Product(
    "Sauce Labs Bike Light",
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    9.99,
  ),
} as const;