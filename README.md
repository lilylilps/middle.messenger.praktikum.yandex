### Учебный проект "Веб-приложение "Чат""

Приложение состоит из нескольких страниц - страницы входа, регистрации, основной страницы с лентой чатов и перепиской в рамках одного чата, а также страницы профиля с возможностью изменить фото/пароль/данные пользователя.

Макеты в Figma: https://www.figma.com/file/QdO6nVwj9IrqgBM1t7xA3D/Chat-draft?node-id=0%3A1&t=rz8WC1C84VbQ9OH6-0

Предоставленное API: https://ya-praktikum.tech/api/v2/swagger/#/

Домен в Netlify: https://fastidious-florentine-4b8527.netlify.app

Для работы с проектом локально нужно установить необходимые пакеты командой ```npm install```.

Чтобы сбилдить проект, необходимо использовать команду ```npm run build```.

Запустить проект можно командой ```npm run start``` (в этом случае произойдет билд проекта и его запуск на http://localhost:3000/).

### Обновленный функционал
- в формы на страницах входа/регистрации/изменения данных/изменения пароля добавлена валидация обязательных полей;
- данные из всех форм и модальных окон, а также выбранные для изменения аватаров чата и профиля файлы выводятся в консоль;
- доработана страница с лентой чатов и окном переписки;
- добавлены компонентный подход на основе класса Block и управление событиями через класс EventBus;
- для запросов к API добавлен класс HTTPTransport;
- для работы с сообщениями в чатах добавлен класс WebSocketTransport; 
- для роутинга добавлен класс Router;

Pull request Sprint 1: https://github.com/lilylilps/middle.messenger.praktikum.yandex/pull/2

Pull request Sprint 2: https://github.com/lilylilps/middle.messenger.praktikum.yandex/pull/3

Pull request Sprint 3: https://github.com/lilylilps/middle.messenger.praktikum.yandex/pull/4
