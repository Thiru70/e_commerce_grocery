import tomato from "../assets/products/tomato.png";
import apple from "../assets/products/apple.png";
import milk from "../assets/products/milk.png";
import bread from "../assets/products/bread.png";
import banana from "../assets/products/banana.png";
import rice from "../assets/products/rice.png";

const products = [
  {
    id: 1,
    name: "Organic Tomato",
    category: "Vegetables",
    image: tomato,
    description:
      "Fresh organic tomatoes directly from local farms.",
    rating: 4.8,
    price: 60,
    oldPrice: 80,
    discount: 25,
    stock: 100,
    weight: "1 Kg",
  },
  {
    id: 2,
    name: "Fresh Apple",
    category: "Fruits",
    image: apple,
    description:
      "Sweet and juicy apples rich in vitamins.",
    rating: 4.7,
    price: 180,
    oldPrice: 220,
    discount: 18,
    stock: 80,
    weight: "1 Kg",
  },
  {
    id: 3,
    name: "Cow Milk",
    category: "Dairy",
    image: milk,
    description:
      "Fresh cow milk with high nutrition.",
    rating: 4.9,
    price: 45,
    oldPrice: 55,
    discount: 18,
    stock: 200,
    weight: "500 ml",
  },
  {
    id: 4,
    name: "Brown Bread",
    category: "Bakery",
    image: bread,
    description:
      "Healthy whole wheat bread.",
    rating: 4.6,
    price: 35,
    oldPrice: 45,
    discount: 22,
    stock: 70,
    weight: "400 g",
  },
  {
    id: 5,
    name: "Banana",
    category: "Fruits",
    image: banana,
    description:
      "Naturally sweet fresh bananas.",
    rating: 4.7,
    price: 55,
    oldPrice: 65,
    discount: 15,
    stock: 120,
    weight: "1 Dozen",
  },
  {
    id: 6,
    name: "Basmati Rice",
    category: "Rice",
    image: rice,
    description:
      "Premium quality basmati rice.",
    rating: 4.9,
    price: 450,
    oldPrice: 520,
    discount: 13,
    stock: 50,
    weight: "5 Kg",
  },
];

export default products;