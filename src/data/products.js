import coffee10Img from '../assets/image/coffee-10.png';
import coffee11Img from '../assets/image/coffee-11.png';
import coffee4Img from '../assets/image/coffee-4.png';
import coffee5Img from '../assets/image/coffee-5.png';
import coffee6Img from '../assets/image/coffee-6.png';
import coffee7Img from '../assets/image/coffee-7.png';
import coffee8Img from '../assets/image/coffee-8.png';
import coffee9Img from '../assets/image/coffee-9.png';
import dessert1Img from '../assets/image/dessert-1.png';
import dessert2Img from '../assets/image/dessert-2.png';
import dessert3Img from '../assets/image/dessert-3.png';
import dessert4Img from '../assets/image/dessert-4.png';
import dessert5Img from '../assets/image/dessert-5.png';
import dessert6Img from '../assets/image/dessert-6.png';
import dessert7Img from '../assets/image/dessert-7.png';
import dessert8Img from '../assets/image/dessert-8.png';
import tea1Img from '../assets/image/tea-1.png';
import tea2Img from '../assets/image/tea-2.png';
import tea3Img from '../assets/image/tea-3.png';
import tea4Img from '../assets/image/tea-4.png';

// Схема повторяет официальный products.json задания (RS School, Coffee House):
// у каждого размера и у каждой добавки своя доплата (add-price), из которых
// в модалке складывается итоговая цена. Базовая цена (price) соответствует
// размеру S без добавок.
const COFFEE_SIZES = [
  { code: 's', label: 'S', size: '200 ml', addPrice: 0 },
  { code: 'm', label: 'M', size: '300 ml', addPrice: 0.5 },
  { code: 'l', label: 'L', size: '400 ml', addPrice: 1.0 },
];

const DESSERT_SIZES = [
  { code: 's', label: 'S', size: '50 g', addPrice: 0 },
  { code: 'm', label: 'M', size: '100 g', addPrice: 0.5 },
  { code: 'l', label: 'L', size: '200 g', addPrice: 1.0 },
];

const COFFEE_ADDITIVES = [
  { name: 'Sugar', addPrice: 0.5 },
  { name: 'Cinnamon', addPrice: 0.5 },
  { name: 'Syrup', addPrice: 0.5 },
];

const TEA_ADDITIVES = [
  { name: 'Sugar', addPrice: 0.5 },
  { name: 'Lemon', addPrice: 0.5 },
  { name: 'Syrup', addPrice: 0.5 },
];

const DESSERT_ADDITIVES = [
  { name: 'Berries', addPrice: 0.5 },
  { name: 'Nuts', addPrice: 0.5 },
  { name: 'Jam', addPrice: 0.5 },
];

export const products = [
  {
    id: 'irish-coffee',
    category: 'coffee',
    name: 'Irish coffee',
    desc: 'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
    price: 7.0,
    image: coffee4Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'kahlua-coffee',
    category: 'coffee',
    name: 'Kahlua coffee',
    desc: 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
    price: 7.0,
    image: coffee5Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'honey-raf',
    category: 'coffee',
    name: 'Honey raf',
    desc: 'Espresso with frothed milk, cream and aromatic honey',
    price: 5.5,
    image: coffee6Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'ice-cappuccino',
    category: 'coffee',
    name: 'Ice cappuccino',
    desc: 'Cappuccino with soft thick foam in summer version with ice',
    price: 5.0,
    image: coffee7Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'espresso',
    category: 'coffee',
    name: 'Espresso',
    desc: 'Classic black coffee',
    price: 4.5,
    image: coffee8Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'latte',
    category: 'coffee',
    name: 'Latte',
    desc: 'Espresso coffee with the addition of steamed milk and dense milk foam',
    price: 5.5,
    image: coffee9Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'latte-macchiato',
    category: 'coffee',
    name: 'Latte macchiato',
    desc: 'Espresso with frothed milk and chocolate',
    price: 5.5,
    image: coffee10Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'coffee-with-cognac',
    category: 'coffee',
    name: 'Coffee with cognac',
    desc: 'Fragrant black coffee with cognac and whipped cream',
    price: 6.5,
    image: coffee11Img,
    sizes: COFFEE_SIZES,
    additives: COFFEE_ADDITIVES,
  },
  {
    id: 'moroccan',
    category: 'tea',
    name: 'Moroccan',
    desc: 'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
    price: 4.5,
    image: tea1Img,
    sizes: COFFEE_SIZES,
    additives: TEA_ADDITIVES,
  },
  {
    id: 'ginger',
    category: 'tea',
    name: 'Ginger',
    desc: 'Original black tea with fresh ginger, lemon and honey',
    price: 5.0,
    image: tea2Img,
    sizes: COFFEE_SIZES,
    additives: TEA_ADDITIVES,
  },
  {
    id: 'cranberry',
    category: 'tea',
    name: 'Cranberry',
    desc: 'Invigorating black tea with cranberry and honey',
    price: 5.0,
    image: tea3Img,
    sizes: COFFEE_SIZES,
    additives: TEA_ADDITIVES,
  },
  {
    id: 'sea-buckthorn',
    category: 'tea',
    name: 'Sea buckthorn',
    desc: 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
    price: 5.5,
    image: tea4Img,
    sizes: COFFEE_SIZES,
    additives: TEA_ADDITIVES,
  },
  {
    id: 'marble-cheesecake',
    category: 'dessert',
    name: 'Marble cheesecake',
    desc: 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
    price: 3.5,
    image: dessert1Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
  {
    id: 'red-velvet',
    category: 'dessert',
    name: 'Red velvet',
    desc: 'Layer cake with cream cheese frosting',
    price: 4.0,
    image: dessert2Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
  {
    id: 'cheesecakes',
    category: 'dessert',
    name: 'Cheesecakes',
    desc: 'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
    price: 4.5,
    image: dessert3Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
  {
    id: 'creme-brulee',
    category: 'dessert',
    name: 'Creme brulee',
    desc: 'Delicate creamy dessert in a caramel basket with wild berries',
    price: 4.0,
    image: dessert4Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
  {
    id: 'pancakes',
    category: 'dessert',
    name: 'Pancakes',
    desc: 'Tender pancakes with strawberry jam and fresh strawberries',
    price: 4.5,
    image: dessert5Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
  {
    id: 'honey-cake',
    category: 'dessert',
    name: 'Honey cake',
    desc: 'Classic honey cake with delicate custard',
    price: 4.5,
    image: dessert6Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
  {
    id: 'chocolate-cake',
    category: 'dessert',
    name: 'Chocolate cake',
    desc: 'Cake with hot chocolate filling and nuts with dried apricots',
    price: 5.5,
    image: dessert7Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
  {
    id: 'black-forest',
    category: 'dessert',
    name: 'Black forest',
    desc: 'A combination of thin sponge cake with cherry jam and light chocolate mousse',
    price: 6.5,
    image: dessert8Img,
    sizes: DESSERT_SIZES,
    additives: DESSERT_ADDITIVES,
  },
];
