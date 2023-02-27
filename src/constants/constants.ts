import imageMessage from '../../static/icons/hasselblad-swc.jpg';

// После добавления взаимодействия с API останутся только шаблонные данные для инпутов

const MESSAGE_1 = `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент
    попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты
    летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны,
    так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса,
    но что-то пошло не так и на ракету они так никогда и не попали.
    Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`;

const MESSAGE_2 = 'Класс! Уверен, что это может пригодиться для нашей проектной работы!';
const MESSAGE_3 = `Слушай, тут еще нужна твоя помощь) Смотри, вот есть такое видео, хочу показать его на своем открытом уроке, но не могу понять, будет ли оно интересно...
    Можешь посмотреть и сказать, что думасешь?) Буду признателен!`;
const MESSAGE_4 = 'И еще есть текст для выступления, помню, что ты уже делала доклад на похожую тему. Если несложно, было бы здорово, если бы ты прочитала и подправила, если там что-то нет так)';
const MESSAGE_5 = 'Конечно, гляну сегодня ближе к вечеру';
const MESSAGE_6 = 'Вот, вроде вычитала. В целом, все хорошо, внесла только несколько косметических правок';

export const CHAT_MESSAGES = [
    {
        type: 'text',
        text: MESSAGE_6,
        position: 'right',
        time: '17:59'
    },
    {
        type: 'file',
        text: 'New file(1).docx',
        position: 'right',
        time: '17:59'
    },
    {
        type: 'text',
        text: MESSAGE_5,
        position: 'right',
        time: '13:07'
    },
    {
        type: 'file',
        text: 'New file.docx',
        position: 'left',
        time: '12:13'
    },
    {
        type: 'text',
        text: MESSAGE_4,
        position: 'left',
        time: '12:13'
    },
    {
        type: 'video',
        content: {
            src: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
            poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217'
        },
        text: MESSAGE_3,
        position: 'left',
        time: '11:15'
    },
    {
        type: 'text',
        text: MESSAGE_2,
        position: 'left',
        time: '10:35'
    },
    {
        type: 'image',
        content: {
            src: imageMessage
        },
        text: MESSAGE_1,
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
        text: `И Human Interface Guidelines и Material Design рекомендуют проектировать iOS-приложение под наименьший размер — iPhone 5 с размером экрана 320pt х 568pt.
            Делают это, чтобы избежать некорректного отображения контента на маленьких экранах. Некоторые предпочитают проектировать под iPhone 8.`,
        newMessagesCount: 8,
        lastMessageTime: '12:00'
    },
    {
        id: 3,
        name: 'Маша',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        newMessagesCount: 10,
        lastMessageTime: 'Ср'
    },
    {
        id: 4,
        name: 'Катя',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать! Мне кажется, вам точно понравится! С 5 апреля можно зарегистрироваться на мой первый курс по оформлению резюме',
        newMessagesCount: 3,
        lastMessageTime: 'Пн'
    },
    {
        id: 5,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 0,
        lastMessageTime: '10:49'
    },
    {
        id: 6,
        name: 'Алексей',
        text: `И Human Interface Guidelines и Material Design рекомендуют проектировать iOS-приложение под наименьший размер — iPhone 5 с размером экрана 320pt х 568pt.
            Делают это, чтобы избежать некорректного отображения контента на маленьких экранах. Некоторые предпочитают проектировать под iPhone 8.`,
        newMessagesCount: 5,
        lastMessageTime: '12:00'
    },
    {
        id: 7,
        name: 'Маша',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        newMessagesCount: 10,
        lastMessageTime: 'Ср'
    },
    {
        id: 8,
        name: 'Катя',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать! Мне кажется, вам точно понравится! С 5 апреля можно зарегистрироваться на мой первый курс по оформлению резюме',
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
        text: `И Human Interface Guidelines и Material Design рекомендуют проектировать iOS-приложение под наименьший размер — iPhone 5 с размером экрана 320pt х 568pt.
            Делают это, чтобы избежать некорректного отображения контента на маленьких экранах. Некоторые предпочитают проектировать под iPhone 8.`,
        newMessagesCount: 1,
        lastMessageTime: '12:00'
    },
    {
        id: 11,
        name: 'Маша',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        newMessagesCount: 0,
        lastMessageTime: 'Ср'
    },
    {
        id: 12,
        name: 'Катя',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать! Мне кажется, вам точно понравится! С 5 апреля можно зарегистрироваться на мой первый курс по оформлению резюме',
        newMessagesCount: 3,
        lastMessageTime: 'Пн'
    },
    {
        id: 13,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 5,
        lastMessageTime: 'Вт'
    },
    {
        id: 14,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 5,
        lastMessageTime: 'Вт'
    },
    {
        id: 15,
        name: 'Алексей',
        text: `И Human Interface Guidelines и Material Design рекомендуют проектировать iOS-приложение под наименьший размер — iPhone 5 с размером экрана 320pt х 568pt.
            Делают это, чтобы избежать некорректного отображения контента на маленьких экранах. Некоторые предпочитают проектировать под iPhone 8.`,
        newMessagesCount: 1,
        lastMessageTime: 'Вт'
    },
    {
        id: 16,
        name: 'Маша',
        text: 'Друзья, у меня для вас особенный выпуск новостей!',
        newMessagesCount: 0,
        lastMessageTime: 'Ср'
    },
    {
        id: 17,
        name: 'Катя',
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать! Мне кажется, вам точно понравится! С 5 апреля можно зарегистрироваться на мой первый курс по оформлению резюме',
        newMessagesCount: 3,
        lastMessageTime: 'Пн'
    },
    {
        id: 18,
        name: 'Иван',
        text: 'Изображение',
        newMessagesCount: 5,
        lastMessageTime: 'Пн'
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
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        placeholder: 'Иван',
    },
    secondName: {
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        placeholder: 'Иванов',
    },
    displayName: {
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

