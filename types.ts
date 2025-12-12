export interface VegetableItem {
  id: string;
  name: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  imageUrl: string;
  color: string; // Tailwnd color class for placeholder overlay
}

export interface VegetableDetail {
  name: string;
  scientificName: string;
  description: string;
  funFact: string;
  bestSeason: string;
  simpleRecipe: {
    title: string;
    ingredients: string[];
    steps: string[];
  };
}
