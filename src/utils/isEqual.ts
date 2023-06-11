type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isArray(value: unknown): value is [] {
  // @ts-ignore
  return Array.isArray(value);
}

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
      // @ts-ignore
        && value !== null
      // @ts-ignore
        && value.constructor === Object
      // @ts-ignore
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isPlainObject(value) || isArray(value);
}
// @ts-ignore
function isEqual(lhs: any, rhs: any) {
  // Сравнение количества ключей объектов и массивов
  // @ts-ignore
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }
// @ts-ignore
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // И TypeScript это обрабатывает
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual;
