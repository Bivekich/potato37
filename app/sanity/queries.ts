import { client } from './client';
import { About, Contacts } from '../types';

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
