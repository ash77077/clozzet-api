export interface ProductCategory {
  [category: string]: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }[];
}
