import * as theme from "../theme";
const categoryInfo = [
  {
    key: "food",
    icon: "ios-restaurant",
    color: theme.scheme.royal_blue,
    width: 5
  },
  {
    key: "leisure",
    icon: "logo-game-controller-a",
    color: theme.scheme.cerise,
    width: 5
  },
  {
    key: "transport",
    icon: "ios-bus",
    color: theme.scheme.crusta,
    width: 5
  },
  {
    key: "bills",
    icon: "ios-paper",
    color: theme.scheme.green,
    width: 5
  },
  {
    key: "wellbeing",
    icon: "ios-heart",
    color: theme.scheme.fuchsia_blue,
    width: 5
  },
  {
    key: "personal",
    icon: "ios-body",
    color: theme.scheme.curious_blue,
    width: 5
  }
];

const categoryColors = {
  food: theme.scheme.royal_blue,
  leisure: theme.scheme.cerise,
  transport: theme.scheme.crusta,
  bills: theme.scheme.green,
  wellbeing: theme.scheme.fuchsia_blue,
  personal: theme.scheme.curious_blue
};
const categoryIcons = {
  food: "ios-restaurant",
  leisure: "logo-game-controller-a",
  transport: "ios-bus",
  bills: "ios-paper",
  wellbeing: "ios-heart",
  personal: "ios-body"
};

export { categoryInfo, categoryColors,categoryIcons };
