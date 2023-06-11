import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import type BlockType from './Block';
import isEqual from './isEqual';

const DOM = new JSDOM('<html><head></head><body><div id="app"></div></body></html>', {
  url: 'http://localhost',
});

const eventBusMock = {
  on: sinon.stub(),
  emit: sinon.stub(),
};

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { default: typeof BlockType };

describe.only('Block', () => {
  beforeEach(() => {
    // очищаем состояние
    eventBusMock.on.reset();
    eventBusMock.emit.reset();
  });

  class ComponentMock extends Block {
    public render(): DocumentFragment {
      const { document } = DOM.window;
      return document.createDocumentFragment();
    }

    // я сделала тут, чтобы он был публичным, но если в будущем поменяют настоящий componentDidUpdate - тест этого не увидит?
    public componentDidUpdate(oldProps: Record<string, string>, newProps: Record<string, string>) {
      if (!newProps || !oldProps) {
        return false;
      }
      return !isEqual(oldProps, newProps);
    }
  }

  it('should perform init event on initialization', () => {
    new ComponentMock({});
    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('It should instance of Block', () => {
    // action
    const block = new Block({});
    // result
    expect(block).to.be.an.instanceof(Block);
  });

  it('It should perform render function', () => {
    // assert
    const block = new ComponentMock({});
    // action
    const blockSpy = sinon.spy(block, 'render');
    block.render();
    // result
    expect(blockSpy.calledOnce).to.be.true;
    blockSpy.restore();
  });

  it('componentDidUpdate return true with different props', () => {
    const instance = new ComponentMock({});
    const oldProps = { name: 'Oleg Gazmanov' };
    const newProps = { name: 'Radion Gazmanov' };
    const res = instance.componentDidUpdate(oldProps, newProps);
    expect(res).to.be.true;
  });
});
