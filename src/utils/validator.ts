const EMAIL_REGEXP = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
const PHONE_REGEXP = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
const LOGIN_REGEXP = new RegExp(/^[a-zA-Z0-9]{6,}$/);
const NAME_REGEXP = new RegExp(/^[a-zA-Zа-яА-Я]+$/);

const validateLogin = (value: string | undefined) =>{
    if (!value) {
        return 'Обязательное поле';
    } else if (!LOGIN_REGEXP.test(value)) {
        return 'Не менее 6 символов, только латинские буквы и цифры';
    } else return null;
};

const validatePassword = (value: string | undefined) => {
    if (!value) {
        return 'Обязательное поле';
    } else if (value.length < 6) {
        return 'Слишком короткий пароль';
    } else return null;
};

const validateEmail = (value: string | undefined) => {
    if (!value) {
        return 'Обязательное поле';
    } else if (!EMAIL_REGEXP.test(value)) {
        return 'Некорректный e-mail';
    } else return null;
};

const validatePhone = (value: string | undefined) => {
    if (!value) {
        return 'Обязательное поле';
    } else if (!PHONE_REGEXP.test(value)) {
        return 'Некорректный номер телефона';
    } else return null;
};

const validateName = (value: string | undefined) =>{
    if (!value) {
        return 'Обязательное поле';
    } else if (!NAME_REGEXP.test(value)) {
        return 'Допускаются только буквы';
    } else return null;
};

export const validateInput = (name: string, value: string): string | null => {
    switch(name) {
        case('login'):
            return validateLogin(value);
        case('email'):
            return validateEmail(value);
        case('phone'):
            return validatePhone(value);
        case('first_name'):
        case('second_name'):
        case('display_name'):
            return validateName(value);
        case('password'):
        case('old_password'):
        case('new_password'):
        case('repeat_password'):
            return validatePassword(value);
        default: return null;
    }
};
