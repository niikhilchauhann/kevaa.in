// src/data/dailyEssentialsData.js
import poojathali from "../assets/poojathali.png";
import temple from "../assets/temple.png";
import decor from "../assets/decor.jpg";
import urlis from "../assets/urlis.jpg";

const dailyEssentials = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  name: ["Spiced Mint", "Sweet Strawberry", "Cool Blueberries", "Juicy Lemon"][index % 4],
  price: 212,
  originalPrice: 232,
  discount: 20,
  isNew: index % 4 >= 2, // first 2 are not new
  image: [
    poojathali,
    temple,
    decor,
    urlis,
  ][index % 4]
}));

export default dailyEssentials;
