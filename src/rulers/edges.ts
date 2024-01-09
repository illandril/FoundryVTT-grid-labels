import { addEdge, cssRuler } from './container';

const createEdge = (orientation: 'vertical' | 'horizontal') => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-orientation', orientation);

  const edge = document.createElement('div');
  edge.classList.add(cssRuler.child('edge'));
  wrapper.appendChild(edge);

  return { wrapper, edge };
};

export const rulerHorizontal = createEdge('horizontal');
export const rulerVertical = createEdge('vertical');
addEdge(rulerHorizontal);
addEdge(rulerVertical);

Hooks.once('ready', () => {
  const uiMiddle = document.getElementById('ui-middle');
  const uiTop = document.getElementById('ui-top');
  const uiBottom = document.getElementById('ui-bottom');

  const fixSize = () => {
    const activeTool = document.querySelector('.control-tool.active');
    const left = Math.ceil(activeTool?.getBoundingClientRect()?.right ?? uiMiddle?.getBoundingClientRect().left ?? 0) + 8;
    const right = Math.ceil(Math.max(window.innerWidth - (uiMiddle?.getBoundingClientRect().right ?? 0), 0)) + 8;
    const top = Math.ceil(uiTop?.getBoundingClientRect().height ?? 0) + 8;
    const bottom = Math.ceil(uiBottom?.getBoundingClientRect().height ?? 0) + 8;

    rulerVertical.edge.style.paddingLeft = `${left}px`;
    rulerVertical.edge.style.marginLeft = `-${left}px`;
    rulerVertical.wrapper.style.clipPath = `inset(calc(${top}px + 2.25em) ${right}px ${bottom}px ${left}px)`;

    rulerHorizontal.edge.style.paddingTop = `${top}px`;
    rulerHorizontal.edge.style.marginTop = `-${top}px`;
    rulerHorizontal.wrapper.style.clipPath = `inset(${top}px ${right}px ${bottom}px calc(${left}px + 2.5em))`;
  };

  const observer = new ResizeObserver(fixSize);
  if (uiMiddle) {
    observer.observe(uiMiddle);
  }
  if (uiTop) {
    observer.observe(uiTop);
  }
  if (uiBottom) {
    observer.observe(uiBottom);
  }
  fixSize();
});
