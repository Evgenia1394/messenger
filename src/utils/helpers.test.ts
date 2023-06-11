import { expect } from 'chai';
import set from './set';
import isEqual from './isEqual';

describe('set function', () => {
  const keypath = 'test';
  const value = 'some value';
  // @ts-ignore
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });
  // arrange
  it('should set a value by keypath to the object', () => {
    // act
    set(obj, keypath, value);
    // assert
    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it('should return original object', () => {
    // act
    const result = set(obj, keypath, value);
    obj.test2 = 'another value';

    // assert
    expect(result).to.equal(obj);
  });

  it('should return original object if it is not an object', () => {
    const notAnObject = 'string';

    const result = set(notAnObject, keypath, value);

    expect(result).to.eq(notAnObject);
  });
});

describe('isEqual function', () => {
  // let obj: Record<string, unknown>;
  // beforeEach(() => {
  //     obj = {};
  // });

  it('should return false if objects have different amount keys', () => {
    // arrange
    const firstObject = {
      cream: 'five',
      soda: 'six',
    };
    const secondObject = {
      soda: 'six',
    };
    // act
    const result = isEqual(firstObject, secondObject);
    // assert
    expect(result).to.equal(false);
  });

  it('should return true if objects is equal', () => {
    // arrange
    const firstSameObject = {
      cream: 'five',
      soda: 'six',
    };
    const secondSameObject = {
      cream: 'five',
      soda: 'six',
    };
    // act
    const result = isEqual(firstSameObject, secondSameObject);
    // assert
    expect(result).to.equal(true);
  });

  it('should return true if objects have different value is some key', () => {
    // arrange
    const firstSimilarObject = {
      cream: 'bomb',
      soda: 'six',
    };
    const secondSimilarObject = {
      cream: 'five',
      soda: 'six',
    };
    // act
    const result = isEqual(firstSimilarObject, secondSimilarObject);
    // assert
    expect(result).to.equal(false);
  });
});
