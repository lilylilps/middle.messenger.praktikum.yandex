### Учебный проект "Веб-приложение "Чат""

Приложение состоит из нескольких страниц - страницы входа, регистрации, основной страницы с лентой чатов и перепиской в рамках одного чата (в котором можно добавить или удалить польователя, удалить чат или изменить аватарку чата), а также страницы профиля с возможностью изменить фото/пароль/данные пользователя.

Макеты в Figma: https://www.figma.com/file/QdO6nVwj9IrqgBM1t7xA3D/Chat-draft?node-id=0%3A1&t=rz8WC1C84VbQ9OH6-0

Предоставленное API: https://ya-praktikum.tech/api/v2/swagger/#/

Проект развернут в Яндекс.Облаке: https://bbao75b8udhgnoe0blej.containers.yandexcloud.net/

Для работы с проектом локально нужно установить необходимые пакеты командой ```npm install```, а также можно настроить ```precommit``` командой ```npm run prepare```.

Чтобы сбилдить проект, необходимо использовать команду ```npm run build```.

Запустить проект в dev-режиме можно командой ```npm run dev``` (в этом случае произойдет билд проекта и его запуск на http://localhost:3000/).

### Обновленный функционал (4 спринт)
- Сборка проекта переехала с ```parcel``` на ```webpack``` (с настройкой лоадеров для ts, postcss и handlebars)
- Добавлены тесты с помощью Chai и Mocha для базовых классов, хелперов, контроллера тостера и компонента кнопки, локально запускаются командой ```npm test```
- Добавлена docker-сборка приложения

Pull request Sprint 1: https://github.com/lilylilps/middle.messenger.praktikum.yandex/pull/2

Pull request Sprint 2: https://github.com/lilylilps/middle.messenger.praktikum.yandex/pull/3

Pull request Sprint 3: https://github.com/lilylilps/middle.messenger.praktikum.yandex/pull/4

Pull request Sprint 4: https://github.com/lilylilps/middle.messenger.praktikum.yandex/pull/5
