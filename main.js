/**
 * Шаг 1
 * 1. Krok — Převod čísla mezi číselnými soustavami (b₁ → b₂)
 * Cíl: převést vstupní řetězec z báze b₁ do výsledné báze b₂ (2–36).
 */

function convertBase(input, fromBase, toBase) {
  // Шаг 2
  // 2. Sequence — Sekvence
  // Příprava vstupních dat, kontrola rozsahů a normalizace hodnoty.

  const DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // povolené znaky

  // Kontrola správnosti typů a rozsahu bází
  if (!(Number.isInteger(fromBase) && Number.isInteger(toBase))) {
    throw new Error("Základ musí být celé číslo.");
  }
  if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
    throw new Error("Základ mimo povolený rozsah (2–36).");
  }

  // Převedení vstupu na text a očištění mezer, sjednocení na velká písmena
  if (typeof input !== "string") input = String(input);
  let normalizedInput = input.trim().toUpperCase();

  // Zjištění a zpracování znaménka čísla
  let sign = 1;
  if (normalizedInput.startsWith("+")) {
    normalizedInput = normalizedInput.slice(1);
  } else if (normalizedInput.startsWith("-")) {
    sign = -1;
    normalizedInput = normalizedInput.slice(1);
  }

  //
  // Шаг 3
  // 3. Selection — Selekce (větvení kontrol)
  // Kontrola, zda je vstup správný, a případné vyvolání chyb.
  //

  // Prázdný vstup po odstranění znaménka
  if (normalizedInput.length === 0) {
    throw new Error("Prázdný vstup – chybí číslice po znaménku.");
  }

  // Ověření, že všechny znaky odpovídají zvolené soustavě
  for (const character of normalizedInput) {
    const characterValue = DIGITS.indexOf(character);
    if (characterValue === -1 || characterValue >= fromBase) {
      throw new Error(`Neplatný znak "${character}" pro soustavu ${fromBase}.`);
    }
  }

  //
  // Шаг 4 делаем иттерацию
  // 4. Iteration — Iterace (hlavní převodní logika)
  // 4.1. Převod z báze b₁ do desítkové
  // 4.2. Ošetření nuly
  // 4.3. Převod z desítkové do báze b₂
  // 4.4. Vrácení finálního výsledku
  //

  // 4.1 — Převod z báze b₁ do desítkové pomocí Hornerova schématu
  let decimal = 0n;
  const b1 = BigInt(fromBase);
  for (const character of normalizedInput) {
    const characterValue = BigInt(DIGITS.indexOf(character));
    decimal = decimal * b1 + characterValue;
  }

  // 4.2 — Hraniční případ: pokud je hodnota 0, ihned vracíme "0"
  if (decimal === 0n) {
    return "0";
  }

  // 4.3 — Převod z desítkové do báze b₂ opakovaným dělením
  const b2 = BigInt(toBase);
  let resultString = "";
  let currentValue = decimal; // pracujeme s kladnou hodnotou

  while (currentValue > 0n) {
    const remainder = currentValue % b2;              // zbytek po dělení
    const remainderChar = DIGITS[Number(remainder)];  // odpovídající znak
    resultString = remainderChar + resultString;      // přidáme zleva
    currentValue = currentValue / b2;                 // celočíselné dělení
  }

  // 4.4 — Vrácení finálního výsledku se znaménkem
  return (sign < 0 ? "-" : "") + resultString;
}

/* ===========================
   Консоль логи
   =========================== */
console.log('101101 (2) ->', convertBase("101101", 2, 10));  // 45
console.log('45 (10) ->', convertBase("45", 10, 16));        // 2D
console.log('2D (16) ->', convertBase("2D", 16, 2));         // 101101
console.log('-7FF (16) ->', convertBase("-7FF", 16, 10));    // -2047
