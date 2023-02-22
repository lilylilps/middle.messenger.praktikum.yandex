const EMAIL_REGEXP = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
const PHONE_REGEXP = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

const validateRequiredText = (value: string | undefined) =>
    value ? null : 'Обязательное поле';

const validatePassword = (value: string | undefined) => {
    if (!value) {
        return 'Обязательное поле';
    } else if (value.length < 6) {
        return 'Неверный формат';
    } else return null;
}

const validateEmail = (value: string | undefined) => {
    if (!value) {
        return 'Обязательное поле';
    } else if (!EMAIL_REGEXP.test(value)) {
        return 'Неверный формат';
    } else return null;
}

const validatePhone = (value: string | undefined) => {
    if (!value) {
        return 'Обязательное поле';
    } else if (!PHONE_REGEXP.test(value)) {
        return 'Неверный формат';
    } else return null;
}

export const validate = (type: string, value: string | undefined): string | null => {
    switch(type) {
        case('text'):
            return validateRequiredText(value);
        case('password'):
            return validatePassword(value);
        case('email'):
            return validateEmail(value);
        case('tel'):
            return validatePhone(value);
    }

    return null;
};
