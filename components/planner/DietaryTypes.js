import * as theme from "../../theme";
const dietaryTypes = [
  {
    key: "Meat",
    icon: "ios-egg",
    color: theme.scheme.royal_blue,
    width: 2.4
  },
  {
    key: "Fish",
    icon: "ios-analytics",
    color: theme.scheme.carnation,
    width: 2.4
  },
  {
    key: "Vegetarian",
    icon: "ios-nutrition",
    color: theme.scheme.sunshade,
    width: 2.4
  },
  {
    key: "Vegan",
    icon: "ios-leaf",
    color: theme.scheme.cerise,
    width: 2.4
  },
  {
    key: "Gluten",
    icon: "ios-flower",
    color: theme.scheme.curious_blue,
    width: 2.4
  },
  {
    key: "Dairy",
    icon: "ios-ice-cream",
    color: theme.scheme.ufo_green,
    width: 2.4
  },
  {
    key: "Other",
    icon: "ios-add",
    color: theme.scheme.fuchsia_blue,
    width: 2.4
  },
];

const dietaryColors = {
  Meat: theme.scheme.royal_blue,
  Fish: theme.scheme.carnation,
  Vegetarian: theme.scheme.sunshade,
  Vegan: theme.scheme.cerise,
  Gluten: theme.scheme.curious_blue,
  Dairy: theme.scheme.ufo_green,
  Other: theme.scheme.fuchsia_blue
};
const dietaryIcons = {
    Meat: "ios-egg",
    Fish: "ios-analytics",
    Vegetarian: "ios-nutrition",
    Vegan: "ios-leaf",
    Gluten: "ios-flower",
    Dairy: "ios-ice-cream",
    Other: "ios-add",
};

export { dietaryTypes, dietaryColors,dietaryIcons };
