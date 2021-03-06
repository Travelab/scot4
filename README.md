# scot4

[![Greenkeeper badge](https://badges.greenkeeper.io/Travelab/scot4.svg)](https://greenkeeper.io/)
Тулза помогающая разрабатывать пакеты: компоненты, утилиты и модули разного рода.

## Установка
0. Включи правильную версию Node.js `nvm use`
1. Установите scot4 `yarn add scot4`
2. Создайте папку для компонентов `components`
3. Создайте папку для модулей `modules`
4. Попробуйте запустить команду `scot4` в консоле, должна появиться справка

## Использование
scot4 - является консольной утилитой, которая создана, чтобы автоматизировать рутиные процессы разработки пакетов. Вся работа осуществляется вызовом команды `scot4` в консоле внутри рабочей директории (всегда является директорией репозитория).

Утилита имеет несколько команд, суть которых описана ниже:

Команда  | Аргументы                           | Описание
---------|-------------------------------------|------------------------
dev      | [componentName] [lint] [story]      | Запуск среды разработки
build    | [componentName] [server]            | Запуск сборки проекта
build-ci | [componentName]                     | Запуск сборки проекта для CI систем
lint     | [componentName]                     | Запуск eslint для проверки компонента
create   | [componentName]                     | Мастер создания пакетов

## Подробнее о командах

### create [componentName]
Команда создает компонента с выбранным именем.

Если не указывать компоненты, программа запустится в интерактивном режиме. Интерактивный режим позволяет видеть список всех доступных к разработке компонент и предлагает указать необходимые компоненты.

```bash
scot4 create - имя по умолчанию не указано
scot4 create Pages - имя по умолчанию указано
```

### dev [componentName] [lint] [story]
Команда запускает среду разработки компонента с предварительно выбранными целями, т.е. компонентами, над которыми требуется начать процесс разработки. Компоненты хранятся внутри папки `components`, которая лежит в корне. Внутри каждой компоненты должна обязательна существовать папка `stories` с файлом-индексом, откуда проиходит рендеринг компонента (точка входа).

Если не указывать компоненты, программа запустится в интерактивном режиме. Интерактивный режим позволяет видеть список всех доступных к разработке компонент и предлагает указать необходимые компоненты.

Команда игнорирует компоненты, которых не существует.

```bash
scot4 dev - запуск в интерактивном режиме
scot4 dev Pages - запуск компонента Pages, без интерактивного режима и storybook
scot4 dev Pages lint - запуск компонента Pages с eslint, без интерактивного режима и storybook
scot4 dev Pages lint story - запуск компонента Pages с eslint и storybook, без интерактивного режима
```

### build [componentName] [server]
Команда запускает сборку компонента для продакшен среды.

Если не указывать компоненты, программа запустится в интерактивном режиме. Интерактивный режим позволяет видеть список всех доступных к разработке компонент и предлагает указать необходимые компоненты.

Команда игнорирует компоненты, которых не существует.

```bash
scot4 build - сборка jв интерактивном режиме
scot4 build Pages - сборка компонента Pages, без интерактивного режима
scot4 build Pages server - сборка компонента Pages и запуск компонента на сервере, без интерактивного режима
```

### build-ci [componentName]
Команда запускает сборку компонента для CI среды.

Нету интерактивного режима, требуется только для CI систем.

Команда игнорирует компоненты, которых не существует.

```bash
scot4 build Pages - сборка компонента Pages
```

### lint [componentName]
Команда запускает eslint для проверки компонента на соответствие code style.

Если не указывать компоненты, программа запустится в интерактивном режиме. Интерактивный режим позволяет видеть список всех доступных к разработке компонент и предлагает указать необходимые компоненты.

Команда игнорирует компоненты, которых не существует.

```bash
scot4 lint - запуск проверки компонента с интерактивным режимом
scot4 lint Pages - запуск проверки компонента Pages, без интерактивного режима
```

## Roadmap
* Вынести components/modules в examples и запускать как отдельный проект, что бы не хранить все зависимости примеров в основном package.json
* Убрать поддержку knit.js, поправить create команду, что бы она не создавала package.json
* Вынести в utils дублирующий код, такой как - build/selectPort.js, startServer.js
* Подумать над заменой component-loader на статический entry point
* Вынести babel-plugins и babel-preset из config/parts/babel.js в отдельный babel-preset-scot4
* Обновить style-loader и css-loader опции в свзяи с обновлением пакетов

## Содействие
Поговорите с Димой: @sukazavr
