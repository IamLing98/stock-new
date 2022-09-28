import { AG_GRID_LOCALE_EN, AG_GRID_LOCALE_VI } from "./locale.en";

var AG_GRID_LOCALE_ZZZ = {};

// Create a dummy locale based on english but prefix everything with zzz
Object.keys(AG_GRID_LOCALE_EN).forEach(function (key) {
  if (key === "thousandSeparator" || key === "decimalSeparator") {
    return;
  }
  AG_GRID_LOCALE_ZZZ[key] = AG_GRID_LOCALE_VI[key];
});
export default AG_GRID_LOCALE_ZZZ;
