import Block from './Block';

export default function render(component: Block) {
  // @ts-ignore
  const root = document.querySelector('#root');

  if (root) { root.appendChild(component.getContent() as any); }

  component.dispatchComponentDidMount();

  return root;
}
