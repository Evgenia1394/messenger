export const RegExpExpressions: {[key: string]: string} = {
  login: '^[a-zA-Z0-9-_]{3,20}$',
  password: '(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}',
  first_name: '^[А-ЯA-Z][а-яА-Яa-zA-Z-]{1,}$',
  second_name: '^[А-ЯA-Z][а-яА-Яa-zA-Z-]{1,}$',
  phone: '^[1-9+][1-9]{9,14}$',
  email: '([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)',
};

export function isValidForm(validateWithType = false): boolean {
  const allInputs: HTMLInputElement[] = Array.from(document.querySelectorAll('input'))
    .filter((item: HTMLInputElement) => item.type !== 'file');
  let notValidInputs: HTMLInputElement[];
  if (validateWithType) {
    notValidInputs = allInputs
      .filter((item: HTMLInputElement) => (!new RegExp(RegExpExpressions[item.type]).test(item.value)) || (!item.value));
  } else {
    /** Когда есть инпуты с одинаковым типом в форме - вытаскиваем и валидируем в зав-ти от имени */
    notValidInputs = allInputs
      .filter((item: HTMLInputElement) => (!new RegExp(RegExpExpressions[item.name]).test(item.value)) || (!item.value));
  }
  if (notValidInputs.length) {
    return false;
  }
  return true;
}

export function validateInput(value: string, name: string, id: string) {
  const inputError: HTMLInputElement = document.querySelector(`span.${id}`);
  if (new RegExp(RegExpExpressions[name]).test(value)) {
    inputError.textContent = '';
  } else {
    inputError.textContent = `Неверный формат поля ${name}`;
  }
}

export function requiredValidation(tag: string) {
  const Input: HTMLInputElement = document.getElementById(tag) as HTMLInputElement;
  const inputError: HTMLElement = document.querySelector(`span.${tag}`);
  if (Input.value) {
    inputError.textContent = '';
    return true;
  }
  inputError.textContent = 'Сообщение не введено!';
  return false;
}
