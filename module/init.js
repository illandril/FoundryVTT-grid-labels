const COLUMN_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const toColumnLetters = (x) => {
  let letters = '';
  while (x >= 0) {
    const letterIndex = x % 26;
    const letter = COLUMN_LETTERS[letterIndex];
    letters = letter + letters;
    x = Math.floor(x / 26) - 1;
  }
  return letters;
};

Hooks.on('init', () => {
  const origDraw = SquareGrid.prototype.draw;
  SquareGrid.prototype.draw = function (...args) {
    console.log('drawing!!');
    origDraw.apply(this, args);

    let { alpha, dimensions } = this.options;
    console.log(this.options);
    if (alpha === 0) return this;

    const { sceneWidth, sceneHeight, size, paddingX, paddingY } = dimensions;
    const nx = Math.floor(sceneWidth / size);
    const ny = Math.ceil(sceneHeight / size);
    for (let ix = 0; ix < nx; ix++) {
      const x = ix * size + paddingX;
      for (let iy = 0; iy < ny; iy++) {
        const y = iy * size + paddingY;
        const text = new PIXI.Text(`${toColumnLetters(ix)}${iy+1}`, {
          fontFamily: 'Signika',
          fontSize: 12,
          fontWeight: 'bold',
          fill: 0xffffff,
        });
        text.setTransform(x+4, y+4);
        this.addChild(text);
      }
    }

    return this;
  };
});
