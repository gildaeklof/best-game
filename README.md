INSERT MANDATORY GIF

# Project Title

Text about the project and which JavaScript library you're using. This would also be a great place to link the game on Netlify.

# Installation

Add the installation instructions.

# Changelog

- [#1 - Add a link to each pull request with a descriptive line.](#1)

# Code Review

1. `package.json` - Good minimal dependencies.
2. `GameScene.js:48` - Consider adding a visual load confirmation on click as delay feels unresponsive.
3. `Enemy.js:258` - Consider making damage increase for every hit taken, only risk of losing is at start of game.
4. There seems to be general slowdown on Firefox 89.0b15 (64-bit) from scene transitions.
5. During scene load/transition, the console logs 'Texture.frame missing: 1' every rendered frame.
6. Would it be possible to utilize a global or scene preload to transition between scenes without delay?
7. Consider making the jewels spawn and fall upon entering viewport, would make for great visual effect.
8. The code structure is very clean and easily understood, reads beautifully.
9. The game has great visuals, all the various sound effects also add a lot.
10. The use of preload and constants is very coherent

# Testers

Tested by the following people:

1. felixgren
2. pnpjss
3. Jane Doe
4. John Doe

Tested by the following muggles (non-coders):

1. Jane Doe
2. John Doe
3. Jane Doe
4. John Doe
