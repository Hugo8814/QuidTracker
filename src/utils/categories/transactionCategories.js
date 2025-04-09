// import nandosLogo from "../../imgs/merchants/nandos.png";
// import dominosLogo from "../../imgs/merchants/dominos.png";
// import uberEatsLogo from "../../imgs/merchants/ubereats.png";
// import mcdonaldsLogo from "../../imgs/merchants/mcdonalds.png";
// import kfcLogo from "../../imgs/merchants/kfc.png";
// import starbucksLogo from "../../imgs/merchants/starbucks.png";
// import greggLogo from "../../imgs/merchants/greggs.png";
// import costaLogo from "../../imgs/merchants/costa.png";

export const categories = {
  FOOD: {
    color: "#FF6B6B",
    icon: "🍽️",
    keywords: ["RESTAURANT", "CAFE", "FOOD", "EAT", "DELIVEROO", "MORLEYS"],
    merchants: {
      NANDOS: {
        logo: "/merchants/food/nandos.png",
        variations: ["NANDOS", "NANDOS.CO.UK", "NANDO"],
      },
      DOMINOS: {
        logo: "/merchants/food/dominos.png",
        variations: [
          "DOMINOS",
          "DOMINO'S PIZZA",
          "DOMINO",
          "DOMINO S PIZZA",
          "DOMINO S PIZZA MILTON KEYNES",
        ],
      },
      "UBER EATS": {
        logo: "/merchants/food/ubereats.png",
        variations: [
          "UBER*EATS",
          "UBER *EATS",
          "UBER*EATS HELP.UBER",
          "UBER *EATS HELP.UBER.COMENG",
        ],
      },
      MCDONALDS: {
        logo: "/merchants/food/mcdonalds.png",
        variations: ["MCDONALDS", "MCDONALD", "MCD"],
      },
      KFC: {
        logo: "/merchants/food/kfc.png",
        variations: ["KFC", "KENTUCKY"],
      },
      STARBUCKS: {
        logo: "/merchants/food/starbucks.png",
        variations: ["STARBUCKS", "SBUX"],
      },
      GREGGS: {
        logo: "/merchants/food/greggs.png",
        variations: ["GREGGS", "GREGG"],
      },
      COSTA: {
        logo: "/merchants/food/costa.png",
        variations: ["COSTA COFFEE", "COSTA"],
      },
    },
  },
  SHOPPING: {
    color: "#4ECDC4",
    icon: "🛍️",
    keywords: ["STORE", "RETAIL", "SHOP", "MARKET", "AMAZON"],
    merchants: {
      AMAZON: {
        logo: "/merchants/shopping/amazon.png",
        variations: ["AMAZON", "AMAZON.CO.UK", "AMZ*"],
      },
    },
  },
  TRANSPORT: {
    color: "#45B7D1",
    icon: "🚗",
    keywords: ["UBER", "TAXI", "TRANSPORT", "RAIL", "TFL", "TRAIN"],
  },
  BILLS: {
    color: "#D4A5A5",
    icon: "📃",
    keywords: ["BILL", "UTILITY", "PHONE", "INTERNET"],
    merchants: {
      HEROKU: {
        logo: "/merchants/bills/heroku.png",
        variations: ["HEROKU*", "HEROKU", "HEROKU* SAN FRANCISCOCA"],
      },
    },
  },
  ENTERTAINMENT: {
    color: "#FFEEAD",
    icon: "🎭",
    keywords: ["CINEMA", "THEATRE", "ENTERTAINMENT"],
    merchants: {
      SPOTIFY: {
        logo: "/merchants/entertainment/spotify.png",
        variations: ["SPOTIFY"],
      },
      NETFLIX: {
        logo: "/merchants/entertainment/netflix.png",
        variations: ["NETFLIX"],
      },
    },
  },
  DEFAULT: {
    color: "#A9A9A9",
    icon: "💳",
    keywords: [],
  },
};

export const categorizeTransaction = (transaction) => {
  const description = transaction?.description?.toUpperCase() || "";
  const merchantName =
    transaction?.meta?.provider_merchant_name?.toUpperCase() || "";

  //   console.log("Processing transaction:", {
  //     description,
  //     merchantName,
  //   });

  // First check for specific merchant matches
  for (const [category, data] of Object.entries(categories)) {
    if (data.merchants) {
      for (const [merchant, merchantData] of Object.entries(data.merchants)) {
        // Convert variations to uppercase for comparison
        const hasMatch = merchantData.variations.some((variation) => {
          const upperVariation = variation.toUpperCase();
          return (
            description.includes(upperVariation) ||
            merchantName.includes(upperVariation) ||
            // Add exact matches
            description === upperVariation ||
            merchantName === upperVariation
          );
        });

        if (hasMatch) {
          // console.log("Found merchant match:", {
          //   merchant,
          //   logo: merchantData.logo,
          //   description,
          //   merchantName,
          // });

          // Verify logo import
          if (!merchantData.logo) {
            console.error("Missing logo for merchant:", merchant);
          }

          return {
            category,
            color: data.color,
            icon: data.icon,
            logo: merchantData.logo,
            merchantName: merchant,
          };
        }
      }
    }
  }

  // If no merchant match, check category keywords
  for (const [category, data] of Object.entries(categories)) {
    if (
      data.keywords.some(
        (keyword) =>
          description.includes(keyword) || merchantName.includes(keyword)
      )
    ) {
      return {
        category,
        color: data.color,
        icon: data.icon,
        logo: null,
        merchantName: null,
      };
    }
  }

  return {
    category: "DEFAULT",
    color: categories.DEFAULT.color,
    icon: categories.DEFAULT.icon,
    logo: null,
    merchantName: null,
  };
};
