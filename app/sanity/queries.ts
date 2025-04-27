import { client } from './client';
import { About, Contacts, Category } from '../types';

export async function getCategories(): Promise<Category[]> {
  return client.fetch(`*[_type == "category"] | order(order asc) {
    _id,
    name,
    "slug": slug.current
  }`);
}

export async function getAboutPageData(): Promise<About> {
  const data = await client.fetch(`*[_type == "about"][0] {
    title,
    subtitle,
    description,
    "image": {
      "url": image.asset->url,
      "alt": image.alt
    },
    teamTitle,
    "teamMembers": teamMembers[] {
      name,
      position,
      "photo": {
        "url": photo.asset->url,
        "alt": photo.alt
      }
    }
  }`);

  return data;
}

export async function getContactsPageData(): Promise<Contacts> {
  const data = await client.fetch(`*[_type == "contacts"][0] {
    title,
    subtitle,
    address,
    phone,
    email,
    workHours,
    socialLinks,
    mapLocation
  }`);

  return data;
}
