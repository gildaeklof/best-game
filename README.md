![](https://media.giphy.com/media/KcKAiYMbLMdGS8KsB3/giphy.gif)

# The Bunny Mansion

We created a platformer game called The Bunny Mansion (not the Bunny Mansion you might have expected...), using Phaser 3. Try to make it to the end of the level, and avoid the bunnies, they will hurt you!
[The Bunny Mansion](https://bunnymansion.netlify.app/)

# Installation

1. Clone the repository.
2. Run `npm install`.
3. Start a local server, `npm run dev`.
4. HAVE FUN!!!

# Changelog

- [#1 - Initial scene setup.](https://github.com/gildaeklof/best-game/pull/1)
- [#2 - Added jumping feature.](https://github.com/gildaeklof/best-game/pull/2)
- [#3 - Added coins, jewels, and platforms.](https://github.com/gildaeklof/best-game/pull/3)
- [#4 - Added game over scene.](https://github.com/gildaeklof/best-game/pull/4)
- [#5 - Added new gae scenes.](https://github.com/gildaeklof/best-game/pull/5)
- [#6 - Added sound effects.](https://github.com/gildaeklof/best-game/pull/6)
- [#7 - Updated sound effects.](https://github.com/gildaeklof/best-game/pull/7)
- [#8 - Enemies damage player.](https://github.com/gildaeklof/best-game/pull/8)
- [#9 - Changed bundler to Vite.](https://github.com/gildaeklof/best-game/pull/9)
- [#10 - Fixed image path.](https://github.com/gildaeklof/best-game/pull/10)
- [#11 - Improved collision with enemies.](https://github.com/gildaeklof/best-game/pull/11)
- [#12 - Added goal.](https://github.com/gildaeklof/best-game/pull/12)
- [#13 - Cleaned up code.](https://github.com/gildaeklof/best-game/pull/13)
- [#14 - Added favicon and assets.](https://github.com/gildaeklof/best-game/pull/14)
- [#15 - Fixed sound on retry.](https://github.com/gildaeklof/best-game/pull/15)
- [#17 - Added README.](https://github.com/gildaeklof/best-game/pull/17)

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
3. Rikard Segerkvist
4. Amanda Fager

Tested by the following muggles (non-coders):

1. Julia Fredin
2. Claudia Delbro
3. Filippa Von Liewen Wistrand
4. Aline Carvalho Nejstgaard
