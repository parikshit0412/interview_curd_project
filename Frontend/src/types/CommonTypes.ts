export interface UserType {
    _id: string;
    name: string;
    email: string;
    DOB: string;
  }

 export interface ProductType {
    _id: string;
    name: string;
    picture: string;
    cost: number;
    userName?: string;
    purchaseDate?: Date;
  }