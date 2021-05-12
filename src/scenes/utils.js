export const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; ++i) {
    const m = scene.add
      .image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};

export const coinCollector = (scene, player, coinType, score) => {
  const s = coinType.scene.physics.world;
  s.disableBody(true, true);
  scene.scoreLabel.add(score);
};
