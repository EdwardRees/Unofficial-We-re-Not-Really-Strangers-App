const cards = require("./cards.json");
const parse = () => {
  let data = JSON.parse(JSON.stringify(cards));
  let level1 = data["level 1"],
    level2 = data["level 2"],
    level3 = data["level 3"],
    finalCard = data["final card"];

  return {
    "Level 1": level1,
    "Level 2": level2,
    "Level 3": level3,
    "Final Card": finalCard,
  };
};

export { parse };
