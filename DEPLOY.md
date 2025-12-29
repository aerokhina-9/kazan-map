# Инструкция по деплою на GitHub Pages

## Подготовка репозитория

1. Создайте новый репозиторий на GitHub
2. Клонируйте его локально или используйте существующий проект

## Настройка GitHub Pages

### Вариант 1: Репозиторий в корне (username.github.io)

Если ваш репозиторий называется `username.github.io`:
- Сайт будет доступен по адресу `https://username.github.io`
- Никаких дополнительных настроек не требуется
- Просто загрузите код и настройте GitHub Actions

### Вариант 2: Обычный репозиторий (например, kazan-map)

Если репозиторий называется по-другому (например, `kazan-map`):
- Сайт будет доступен по адресу `https://username.github.io/kazan-map`
- Нужно настроить basePath

**Шаги для настройки basePath:**

1. Откройте `next.config.ts` и раскомментируйте:
   ```typescript
   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/kazan-map';
   
   const nextConfig: NextConfig = {
     basePath: basePath,
     // ...
   };
   ```
   Замените `/kazan-map` на имя вашего репозитория.

2. Откройте `.github/workflows/deploy.yml` и раскомментируйте:
   ```yaml
   env:
     NEXT_PUBLIC_BASE_PATH: /kazan-map
   ```
   Замените `/kazan-map` на имя вашего репозитория.

## Настройка в GitHub

1. Перейдите в Settings → Pages вашего репозитория
2. В разделе "Source" выберите "GitHub Actions"
3. Сохраните изменения

## Загрузка кода

```bash
# Если репозиторий еще не инициализирован
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/kazan-map.git
git push -u origin main
```

## Автоматический деплой

После push в ветку `main` или `master`:
1. GitHub Actions автоматически запустит workflow
2. Проект соберется и задеплоится на GitHub Pages
3. Проверьте статус в разделе Actions репозитория
4. Сайт будет доступен через несколько минут

## Проверка

После успешного деплоя:
- Откройте раздел Actions в репозитории
- Убедитесь, что workflow завершился успешно (зеленая галочка)
- Перейдите на страницу Settings → Pages
- Там будет ссылка на ваш сайт

## Решение проблем

### Сайт не открывается

1. Проверьте, что в Settings → Pages выбран источник "GitHub Actions"
2. Убедитесь, что workflow завершился успешно
3. Проверьте, правильно ли настроен basePath (если репозиторий не в корне)

### Ссылки не работают

1. Убедитесь, что в `next.config.ts` установлен `trailingSlash: true`
2. Проверьте настройку basePath

### Стили не загружаются

1. Убедитесь, что файл `public/.nojekyll` существует
2. Проверьте, что все пути к ресурсам корректны

## Обновление сайта

Для обновления сайта просто сделайте push в ветку `main`:
```bash
git add .
git commit -m "Update"
git push
```

GitHub Actions автоматически пересоберет и задеплоит обновленную версию.



