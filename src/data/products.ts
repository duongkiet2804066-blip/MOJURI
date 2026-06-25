export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage: string;
  category: string;
  rating: number;
  reviewsCount: number;
  sku: string;
  description: string;
  isHot?: boolean;
  isNew?: boolean;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Medium Flat Hoops",
    price: 100,
    oldPrice: 150,
    image: "/media/product/1.jpg",
    hoverImage: "/media/product/1-2.jpg",
    category: "Earrings",
    rating: 5,
    reviewsCount: 1,
    sku: "EARR-001",
    description: "Elegant medium flat hoop earrings crafted with high-quality gold plating. A classic addition to any jewelry collection.",
    isHot: true,
    inStock: true
  },
  {
    id: 2,
    name: "Bold Pearl Hoop Earrings",
    price: 200,
    image: "/media/product/2.jpg",
    hoverImage: "/media/product/2-2.jpg",
    category: "Earrings",
    rating: 4,
    reviewsCount: 3,
    sku: "EARR-002",
    description: "These bold hoop earrings feature stunning freshwater pearls that catch the light beautifully.",
    isNew: true,
    inStock: true
  },
  {
    id: 3,
    name: "Twin Hoops",
    price: 150,
    oldPrice: 200,
    image: "/media/product/3.jpg",
    hoverImage: "/media/product/3-2.jpg",
    category: "Earrings",
    rating: 4,
    reviewsCount: 2,
    sku: "EARR-003",
    description: "Double the elegance with these twin hoops. Modern design meets timeless sophistication.",
    isHot: true,
    inStock: true
  },
  {
    id: 4,
    name: "Yilver And Turquoise Earrings",
    price: 100,
    oldPrice: 150,
    image: "/media/product/4.jpg",
    hoverImage: "/media/product/4-2.jpg",
    category: "Earrings",
    rating: 4.5,
    reviewsCount: 4,
    sku: "EARR-004",
    description: "Handcrafted silver earrings set with genuine turquoise stones. Adds a pop of vibrant color to any look.",
    inStock: true
  },
  {
    id: 5,
    name: "Classic Pearl Ring",
    price: 90,
    image: "/media/product/5.jpg",
    hoverImage: "/media/product/5-2.jpg",
    category: "Rings",
    rating: 5,
    reviewsCount: 1,
    sku: "RING-001",
    description: "A gorgeous classic ring featuring a central round pearl set in sterling silver.",
    inStock: true
  },
  {
    id: 6,
    name: "Gold Chain Necklace",
    price: 180,
    image: "/media/product/6.jpg",
    hoverImage: "/media/product/6-2.jpg",
    category: "Necklaces",
    rating: 4.8,
    reviewsCount: 5,
    sku: "NECK-001",
    description: "Delicate yet durable 14k gold chain necklace. Perfect for layering or wearing on its own.",
    isNew: true,
    inStock: true
  },
  {
    id: 7,
    name: "Flower Drop Earrings",
    price: 120,
    image: "/media/product/7.jpg",
    hoverImage: "/media/product/7-2.jpg",
    category: "Earrings",
    rating: 4.2,
    reviewsCount: 2,
    sku: "EARR-005",
    description: "Intricately designed floral drop earrings with subtle crystal accents.",
    inStock: true
  },
  {
    id: 8,
    name: "Diamond Hoop Earrings",
    price: 250,
    image: "/media/product/8.jpg",
    hoverImage: "/media/product/8-2.jpg",
    category: "Earrings",
    rating: 5,
    reviewsCount: 3,
    sku: "EARR-006",
    description: "Luxury diamond hoop earrings that offer unmatched brilliance and shine for special occasions.",
    isHot: true,
    inStock: true
  }
];
