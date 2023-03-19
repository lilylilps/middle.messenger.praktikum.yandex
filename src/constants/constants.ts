export const INPUTS = {
    login: {
        name: 'login',
        label: 'Логин',
        type: 'text',
        placeholder: 'ivanivanov',
    },
    email: {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'ivanivanov@yandex.ru',
    },
    first_name: {
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        placeholder: 'Иван',
    },
    second_name: {
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        placeholder: 'Иванов',
    },
    display_name: {
        name: 'display_name',
        label: 'Имя в чате',
        type: 'text',
        placeholder: 'Иван',
    },
    password: {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        placeholder: 'не менее 6 символов',
    },
    phone: {
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        placeholder: '+79995555555',
    }
};

export const defaultErrorMessage = 'Произошла ошибка, перезагрузите страницу';
