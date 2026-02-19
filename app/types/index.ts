import { PortableTextBlock } from "@portabletext/types";

export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type ProductImage = {
  _key: string;
  url: string;
  alt?: string | null;
};

export type Product = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: ProductImage[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type DeliveryMethod = "delivery" | "pickup";

export type Order = {
  items: CartItem[];
  total: number;
  name: string;
  phone: string;
  city: string;
  address?: string;
  deliveryMethod: DeliveryMethod;
  comment?: string;
};

export interface About {
  title: string;
  subtitle: string;
  description: PortableTextBlock[];
  image: {
    url: string;
    alt: string;
  };
  teamTitle: string;
  teamMembers: {
    name: string;
    position: string;
    photo: {
      url: string;
      alt: string;
    };
  }[];
}

export interface Contacts {
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  workHours: {
    days: string;
    hours: string;
  }[];
  socialLinks: {
    name: string;
    url: string;
  }[];
  mapLocation: string;
}
