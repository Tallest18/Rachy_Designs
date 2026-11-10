import { contact } from '../content'

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const enquiryLink = whatsappLink('Hello Rachy Designs! ✨ I’d like to make an enquiry.')
