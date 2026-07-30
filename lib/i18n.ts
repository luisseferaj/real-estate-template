export const translations = {
  al: {
    nav: {
      home: "Kryefaqja",
      properties: "Pronat",
      notifications: "Njoftime",
      about: "Rreth Nesh",
    },
    hero: {
      title: "Gjeni pronën tuaj",
      highlight: "të përsosur",
      subtitle: "Prona në shitje dhe me qira në të gjithë Shqipërinë.",
      forSale: "Prona në Shitje",
      forRent: "Prona me Qira",
    },
    properties: {
      latest: "Më të fundit",
      viewAll: "Shiko të gjitha",
      beds: "Dhoma",
      baths: "Banjo",
      area: "m²",
      forSale: "Në Shitje",
      forRent: "Me Qira",
      view: "Shiko pronën",
    },
    notifications: {
      title: "Njoftimet e fundit",
      subtitle: "Lajme",
      viewAll: "Shiko të gjitha",
    },
    cta: {
      title: "Gjeni pronën tuaj të përsosur",
      subtitle: "Ekipi ynë ju shoqëron në çdo hap.",
      button: "Shiko Pronat",
    },
    footer: {
      nav: "Navigimi",
      contact: "Kontakti",
      rights: "Të gjitha të drejtat e rezervuara",
    },
  },
  en: {
    nav: {
      home: "Home",
      properties: "Properties",
      notifications: "News",
      about: "About Us",
    },
    hero: {
      title: "Find your",
      highlight: "perfect property",
      subtitle: "Properties for sale and rent across Albania.",
      forSale: "Properties for Sale",
      forRent: "Properties for Rent",
    },
    properties: {
      latest: "Latest",
      viewAll: "View all",
      beds: "Beds",
      baths: "Baths",
      area: "m²",
      forSale: "For Sale",
      forRent: "For Rent",
      view: "View property",
    },
    notifications: {
      title: "Latest News",
      subtitle: "News",
      viewAll: "View all",
    },
    cta: {
      title: "Find your perfect property",
      subtitle: "Our team guides you every step of the way.",
      button: "View Properties",
    },
    footer: {
      nav: "Navigation",
      contact: "Contact",
      rights: "All rights reserved",
    },
  },
}

export type Lang = "al" | "en"
export type Translations = typeof translations.al