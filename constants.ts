export const CANVAS_SIZE = 4000;
export const VIEWPORT_PADDING = 500;

// public/vege_flot_img 폴더의 이미지들 + 메인 컬러
const BASE_PATH = import.meta.env.BASE_URL || '/';
export const PRODUCE_ITEMS = [
  { name: "Asparagus", image: `${BASE_PATH}vege_flot_img/asparagus.png`, color: "#7CB342" },
  { name: "Avocado", image: `${BASE_PATH}vege_flot_img/avocado.png`, color: "#558B2F" },
  { name: "Blueberry", image: `${BASE_PATH}vege_flot_img/blueberry.png`, color: "#5C6BC0" },
  { name: "Broccoli", image: `${BASE_PATH}vege_flot_img/broccoli.png`, color: "#2E7D32" },
  { name: "Carrot", image: `${BASE_PATH}vege_flot_img/carrot.png`, color: "#EF6C00" },
  { name: "Chili Pepper", image: `${BASE_PATH}vege_flot_img/chili pepper.png`, color: "#C62828" },
  { name: "Coconut", image: `${BASE_PATH}vege_flot_img/coconut.png`, color: "#8D6E63" },
  { name: "Corn", image: `${BASE_PATH}vege_flot_img/corn.png`, color: "#FBC02D" },
  { name: "Dill", image: `${BASE_PATH}vege_flot_img/dill.png`, color: "#66BB6A" },
  { name: "Edamame", image: `${BASE_PATH}vege_flot_img/edamame.png`, color: "#7CB342" },
  { name: "Fig", image: `${BASE_PATH}vege_flot_img/fig.png`, color: "#6A1B9A" },
  { name: "Garlic", image: `${BASE_PATH}vege_flot_img/garlic.png`, color: "#F5F5DC" },
  { name: "Ginger", image: `${BASE_PATH}vege_flot_img/ginger.png`, color: "#D4A574" },
  { name: "Grape", image: `${BASE_PATH}vege_flot_img/grape.png`, color: "#7B1FA2" },
  { name: "Green Bean", image: `${BASE_PATH}vege_flot_img/green bean.png`, color: "#43A047" },
  { name: "Kiwi", image: `${BASE_PATH}vege_flot_img/kiwi.png`, color: "#8BC34A" },
  { name: "Leek", image: `${BASE_PATH}vege_flot_img/leek.png`, color: "#9CCC65" },
  { name: "Lemon", image: `${BASE_PATH}vege_flot_img/lemon.png`, color: "#FFEB3B" },
  { name: "Lettuce", image: `${BASE_PATH}vege_flot_img/lettuce.png`, color: "#81C784" },
  { name: "Lychee", image: `${BASE_PATH}vege_flot_img/lychee.png`, color: "#F48FB1" },
  { name: "Mango", image: `${BASE_PATH}vege_flot_img/mango.png`, color: "#FFB300" },
  { name: "Mangosteen", image: `${BASE_PATH}vege_flot_img/mangosteen.png`, color: "#6A1B9A" },
  { name: "Mushroom", image: `${BASE_PATH}vege_flot_img/mushroom.png`, color: "#A1887F" },
  { name: "Napa Cabbage", image: `${BASE_PATH}vege_flot_img/napa cabbage.png`, color: "#C5E1A5" },
  { name: "Olive", image: `${BASE_PATH}vege_flot_img/olive.png`, color: "#827717" },
  { name: "Orange", image: `${BASE_PATH}vege_flot_img/orange.png`, color: "#FF9800" },
  { name: "Peach", image: `${BASE_PATH}vege_flot_img/peach.png`, color: "#FFAB91" },
  { name: "Peanut", image: `${BASE_PATH}vege_flot_img/peanut.png`, color: "#D7CCC8" },
  { name: "Pear", image: `${BASE_PATH}vege_flot_img/pear.png`, color: "#C0CA33" },
  { name: "Pepper", image: `${BASE_PATH}vege_flot_img/pepper.png`, color: "#FF5722" },
  { name: "Pineapple", image: `${BASE_PATH}vege_flot_img/pineapple.png`, color: "#FDD835" },
  { name: "Pistachio", image: `${BASE_PATH}vege_flot_img/pistachio.png`, color: "#AED581" },
  { name: "Potato", image: `${BASE_PATH}vege_flot_img/potato.png`, color: "#BCAAA4" },
  { name: "Raspberry", image: `${BASE_PATH}vege_flot_img/raspberry.png`, color: "#E91E63" },
  { name: "Sweet Potato", image: `${BASE_PATH}vege_flot_img/sweet potato.png`, color: "#E65100" },
  { name: "Tomato", image: `${BASE_PATH}vege_flot_img/tomato.png`, color: "#E53935" },
  { name: "Watermelon", image: `${BASE_PATH}vege_flot_img/watermelon.png`, color: "#EF5350" },
];

export const VEGETABLE_NAMES = PRODUCE_ITEMS.map(item => item.name);

export const COLOR_OVERLAYS = [
  "bg-red-500", "bg-green-500", "bg-orange-500", "bg-yellow-500", "bg-purple-500", "bg-emerald-500"
];

export const ORGANIC_SHAPES = [
  "rounded-full",
  "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
  "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
  "rounded-[50%_50%_20%_80%/25%_80%_20%_75%]",
  "rounded-[74%_26%_39%_61%/53%_74%_26%_47%]",
];
