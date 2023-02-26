import imageMessage from '../../static/icons/hasselblad-swc.jpg';

const MESSAGE = 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА';

export const CHAT_MESSAGES = [
    {
        type: 'file',
        text: 'New file.docx',
        position: 'right',
        time: '17:59'
    },
    {
        type: 'text',
        text: MESSAGE,
        position: 'left',
        time: '13:07'
    },
    {
        type: 'video',
        content: {
            src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
            poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217'
        },
        position: 'left',
        time: '11:15'
    },
    {
        type: 'image',
        content: {
            src: imageMessage
        },
        text: MESSAGE,
        position: 'right',
        time: '10:29'
    }
];

export const CHATS_BAR = [
    {
        id: 1,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 1,
        lastMessageTime: '10:49'
    },
    {
        id: 2,
        name: 'Алексей',
        text: 'И Human Interface Guidelines и Material Design рекомендуют...',
        newMessagesCount: 8,
        lastMessageTime: '12:00'
    },
    {
        id: 3,
        name: 'Маша',
        text: 'Друзья, у меня для вас особенный выпуск новостей!...',
        newMessagesCount: 10,
        lastMessageTime: 'Ср'
    },
    {
        id: 4,
        name: 'Катя',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
        newMessagesCount: 3,
        lastMessageTime: 'Пн'
    },
    {
        id: 5,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 5,
        lastMessageTime: '10:49'
    },
    {
        id: 6,
        name: 'Алексей',
        text: 'И Human Interface Guidelines и Material Design рекомендуют...',
        newMessagesCount: 5,
        lastMessageTime: '12:00'
    },
    {
        id: 7,
        name: 'Маша',
        text: 'Друзья, у меня для вас особенный выпуск новостей!...',
        newMessagesCount: 10,
        lastMessageTime: 'Ср'
    },
    {
        id: 8,
        name: 'Катя',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
        newMessagesCount: 3,
        lastMessageTime: 'Пн'
    },
    {
        id: 9,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 5,
        lastMessageTime: '10:49'
    },
    {
        id: 10,
        name: 'Алексей',
        text: 'И Human Interface Guidelines и Material Design рекомендуют...',
        newMessagesCount: 1,
        lastMessageTime: '12:00'
    },
    {
        id: 11,
        name: 'Маша',
        text: 'Друзья, у меня для вас особенный выпуск новостей!...',
        newMessagesCount: 10,
        lastMessageTime: 'Ср'
    },
    {
        id: 12,
        name: 'Катя',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
        newMessagesCount: 3,
        lastMessageTime: 'Пн'
    },
    {
        id: 13,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 5,
        lastMessageTime: '10:49'
    }
];

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
    firstName: {
        name: 'firstName',
        label: 'Имя',
        type: 'text',
        placeholder: 'Иван',
    },
    secondName: {
        name: 'secondName',
        label: 'Фамилия',
        type: 'text',
        placeholder: 'Иванов',
    },
    displayName: {
        name: 'displayName',
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

