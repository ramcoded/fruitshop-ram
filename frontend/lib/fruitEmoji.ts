const emojiMap: Record<string, string> = {
  apple: "🍎",
  mango: "🥭",
  banana: "🍌",
  grape: "🍇",
  orange: "🍊",
  strawberry: "🍓",
  watermelon: "🍉",
  pineapple: "🍍",
  cherry: "🍒",
  lemon: "🍋",
  peach: "🍑",
  pear: "🍐",
  kiwi: "🥝",
  blueberry: "🫐",
  coconut: "🥥",
  avocado: "🥑",
  fig: "🫐",
  plum: "🍑",
  lime: "🍋",
  melon: "🍈",
};

export function getFruitEmoji(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lower.includes(key)) return emoji;
  }
  return "🍑";
}
