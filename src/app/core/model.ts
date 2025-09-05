
export interface Iuser {
  _id: string;
  name: string;
  email: string;
  password: string;
}
export interface IuserRes {
  message: string;
  user: Iuser
}

export interface Ilogin{
  email: string;
  password: string;
}
export interface IloginRes{
  message: string;
  token: string
}
export interface IuserData{
    id:string,
    role:string,
    name:string,
    exp:number
}
export interface Icategory {
    _id: number;
    name: string;
    parent: Icategory | null;
}
export interface IcategoryRes {
  message: string;
  category: Icategory[]
}

export interface Icontactus {
  _id?: string;              
  user?: Iuser;       
  category: "complain" | "question";
  message: string;
  subject: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IWebsiteSetting {
  _id: string;
  email: string;
  phone: string;
  facebook?: string;
  instagram?: string;
}

// export interface IWebsiteSettingRes {
//   message: string;
//   settings: IWebsiteSetting
// }

export interface Iproduct{
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  img: string;
  stock: number;
  route: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IproductsRes{
  message: string;
  products: Iproduct[]
}
export interface IproductRes{
  message: string;
  product: Iproduct
}

export interface ICartItem {
  _id: string;
  product: Iproduct;
  quantity: number;
  priceSnapshot: number;
}

export interface ICartResponse {
  cart: any;
  items: ICartItem[];
}