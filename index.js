#!/usr/bin/env node

import chalkAnimation from "chalk-animation";
import crypto from "crypto";

function welcome(callback) {
  const welcomeText = chalkAnimation.pulse(
    "Welcome to PassBuilder Password Generator "
  );
  welcomeText.start();

  process.stdin.once("data", () => {
    welcomeText.stop();
    callback();
  });
}

function generatePassword(
  length,
  includeDigits,
  includeSpecial,
  includeUppercase
) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = includeUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
  const digits = includeDigits ? "0123456789" : "";
  const special = includeSpecial ? "!@#$%^&*()-_=+[]{}|;:,.<>?/`~" : "";

  const allCharacters = lower + upper + digits + special;

  if (!allCharacters) {
    console.error("Error: You must select at least one character set.");
    process.exit(1);
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password;
}

function generatePasswordAndDisplay() {
  const args = process.argv.slice(2);

  const length = args.includes("--length")
    ? parseInt(args[args.indexOf("--length") + 1], 10)
    : 12;
  const includeDigits = args.includes("--include-digits");
  const includeSpecial = args.includes("--include-special");
  const includeUppercase = args.includes("--include-uppercase");

  const password = generatePassword(
    length,
    includeDigits,
    includeSpecial,
    includeUppercase
  );
  console.log(`Generated Password: ${password}`);
}

function displayFooter() {
  const feedbackText = chalkAnimation.neon(
    "We value your feedback! Type 'listen' to share your thoughts."
  );
  feedbackText.start();

  setTimeout(() => {
    feedbackText.stop();
    const footerText = chalkAnimation.rainbow("Crafted with care by Rishabh.");
    footerText.start();
  }, 2000);
}

welcome(() => {
  const helpText = chalkAnimation.neon(
    "Type 'help' for more command details"
  );
  helpText.start();

  generatePasswordAndDisplay();
  console.log("_____________________________________");

  displayFooter();
});
