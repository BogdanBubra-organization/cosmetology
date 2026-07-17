# Service Landing: static sections and icon picker runbook

Цей документ є джерелом контексту для змін Service Landing у DatoCMS. Перед будь-яким запуском schema scripts прочитайте його повністю.

## Критичні правила

- Працювати тільки з `DATOCMS_ENVIRONMENT=main-copy-2026-07-15`.
- Не змінювати й не промотити primary environment.
- Не запускати `dato:landing:finalize`, доки frontend і picker не пройшли QA на задеплоєному URL.
- Не виводити DatoCMS tokens у Git, документацію, логи або чат.
- Якщо preflight знаходить два верхньорівневі блоки одного типу, міграція завершується до перенесення або видалення контенту.

DatoCMS `Promote` замінює primary цілим environment, а не об'єднує environments. Старий `main-copy-2026-07-15` не можна використовувати як production candidate після editorial divergence.

## Поточний стан

Стан на 17 липня 2026 року:

- Sandbox: `main-copy-2026-07-15`.
- Primary environment не змінювався.
- Phase 1 (`dato:landing:up`) виконано успішно.
- У `Service` є 12 нових `single_block`-полів і збережене legacy-поле `landing_sections`.
- Контент `laser-epilation` перенесений у всі 12 статичних полів і звірений із legacy blocks.
- Record `laser-epilation` залишився published.
- У sandbox перевірено 56 Service records.
- Private plugin `Service icon picker` створено й прив'язано до `service_landing_feature.icon_key`.
- Звичайних records лишилося 116, uploads — 298 / 167,495,037 bytes; додано 0 records і 0 uploads.
- Plugin count змінився з 0 на 1.
- Production build проти sandbox успішний: 131 сторінка.
- Phase 2 не виконано: `landing_sections` ще не видалене.

Перед Phase 1 було створено повний backup у `/tmp/cosmetology-datocms-before-static-2026-07-17`. Це локальний тимчасовий backup; для довготривалого зберігання його потрібно перенести в контрольоване сховище поза `/tmp`.

## Статична схема Service

Поля розміщені у фіксованому порядку:

1. `landing_hero`
2. `landing_about`
3. `landing_prices`
4. `landing_equipment`
5. `landing_results`
6. `landing_doctors`
7. `landing_certificates`
8. `landing_preparation`
9. `landing_contraindications`
10. `landing_clinic_gallery`
11. `landing_reviews`
12. `landing_final_cta`

Кожне поле необов'язкове, має тип `single_block` і дозволяє рівно одну відповідну section block model. Повторювані features, price items, doctors, reviews та list items залишаються вкладеними blocks.

Під час Phase 1 legacy `landing_sections` зберігається як контрольне джерело. Blocks глибоко копіюються через CMA, включно з вкладеними blocks, assets і links.

## Іконки без CMS-квот

- Каталог містить рівно 120 ключів у `src/service-icons/catalog.json`.
- Дев'ять legacy keys збережені: `cooling`, `medical`, `equipment`, `location`, `comfort`, `speed`, `safety`, `skin`, `check`.
- SVG sprite генерується з `lucide-static` командою `yarn build:service-icons`.
- Ліцензія зафіксована в `src/service-icons/LUCIDE-LICENSE.txt`.
- DatoCMS зберігає тільки string `icon_key`; SVG не потрапляють у Media Library.
- Невідомий key не ламає картку: іконка приховується, текст продовжує відображатися.
- Якщо невідомий key є єдиним заповненим значенням, порожня картка не рендериться.

Picker підтримує:

- український та англійський пошук;
- категорії;
- SVG preview;
- вибір і очищення;
- arrow-key navigation;
- відображення збереженого key після повторного відкриття record.

Bundle збирається в ignored-директорію `static/dato-icon-picker/` і публікується сайтом на `/dato-icon-picker/`. Звичайні frontend pages цей bundle не імпортують.

## Environment variables

```dotenv
DATOCMS_API_TOKEN=...
DATOCMS_MANAGEMENT_API_TOKEN=...
DATOCMS_ENVIRONMENT=main-copy-2026-07-15
DATOCMS_ICON_PICKER_ENTRYPOINT=https://example.com/dato-icon-picker/
```

- `DATOCMS_API_TOKEN` читає Gatsby source plugin.
- `DATOCMS_MANAGEMENT_API_TOKEN` використовують CMA scripts.
- `DATOCMS_ENVIRONMENT` обов'язково має дорівнювати guard-константі sandbox.
- `DATOCMS_ICON_PICKER_ENTRYPOINT` потрібен для `dato:landing:up`; production URL має бути HTTPS і доступним у DatoCMS iframe.

Не запускати Gatsby без `DATOCMS_ENVIRONMENT`: у такому разі він може прочитати primary.

## Version-controlled scripts

- `scripts/datocms/service-landing-schema.mjs` — definitions, validators, environment guard та 120 icon keys.
- `scripts/datocms/service-landing-migration.mjs` — preflight, deep copy, content verification і rollback copy.
- `scripts/datocms/service-landing-audit.mjs` — read-only schema, content, publication state і plugin verification.
- `scripts/datocms/service-landing-up.mjs` — private plugin preflight, additive schema, Phase 1 migration.
- `scripts/datocms/service-landing-finalize.mjs` — Phase 2 verification і видалення legacy field.
- `scripts/datocms/service-landing-down.mjs` — відновлення legacy modular field/content, видалення static fields і plugin.

## Phase 1: additive migration

Перед першим запуском entrypoint уже має бути задеплоєний або зарезервований на тому самому frontend deployment.

```bash
DATOCMS_ENVIRONMENT=main-copy-2026-07-15 \
DATOCMS_ICON_PICKER_ENTRYPOINT=https://example.com/dato-icon-picker/ \
yarn dato:landing:up
```

Порядок операцій:

1. Валідація environment guard і primary flag.
2. Створення private plugin. Якщо план не дозволяє plugin, script завершується до schema changes.
3. Створення або перевірка block models і 12 `single_block` fields.
4. Прив'язка visual picker до `icon_key`.
5. Read-back verification schema, order, allow-lists і field appearance.
6. Read-only preflight усіх Service records.
7. Deep copy legacy sections у static fields.
8. Повторна публікація records, які до міграції були published.
9. Content verification проти `landing_sections`.

Повторний запуск безпечний: заповнені static fields не дублюються, а їхній контент повторно звіряється з legacy blocks.

Read-only повторна перевірка:

```bash
DATOCMS_ENVIRONMENT=main-copy-2026-07-15 yarn dato:landing:audit
```

## Gatsby compatibility

Встановлений `gatsby-source-datocms@5` не створює GraphQL fields для DatoCMS `single_block`. `gatsby-node.js` містить локальні `createResolvers` для 12 полів і зв'язує raw block IDs із відповідними DatoCMS nodes. Не видаляти ці resolvers без оновлення source plugin на версію з native `single_block` support і повного build QA.

## Build і QA

```bash
DATOCMS_ENVIRONMENT=main-copy-2026-07-15 yarn build
yarn serve
```

Build автоматично:

1. валідує 120 icon definitions;
2. генерує service SVG sprite;
3. збирає DatoCMS plugin;
4. виконує Gatsby production build.

Обов'язковий QA для `/services/laser-epilation`:

- рівно 12 секцій у фіксованому порядку;
- 0 порожніх DOM sections і nested cards;
- whitespace-only strings не рендеряться;
- CTA link показується лише коли є label і URL;
- hero price CTA існує лише коли price section реально рендериться;
- одна price category займає всю ширину;
- дві price categories утворюють дві колонки;
- один review центрується, два займають повний двоколонковий ряд;
- doctors/features/results/gallery коректні для 0/1/2/3+ items;
- controls приховані, якщо carousel не має overflow;
- mobile показує одну card/slide без порожніх слотів;
- немає horizontal overflow і нових console/GraphQL errors.

Існуючий demo має React hydration warnings `#418/#423` саме після browser reload. Чисте пряме завантаження не показує цих errors. Під час regression QA порівнювати чисте завантаження нової версії з чистим завантаженням поточного demo, щоб не приписати наявну reload-проблему цій міграції.

Picker QA у DatoCMS:

1. Відкрити `main-copy-2026-07-15`.
2. Відкрити feature block у `laser-epilation`.
3. Знайти іконку українською.
4. Знайти іншу іконку англійською.
5. Обрати key і зберегти record.
6. Повторно відкрити record та перевірити selection preview.
7. Очистити поле й зберегти.
8. Перевірити всі дев'ять legacy keys.
9. Переконатися, що records/uploads count не збільшився.

## Phase 2: finalize

Запускати тільки після deployment і успішного frontend + DatoCMS picker QA:

```bash
DATOCMS_ENVIRONMENT=main-copy-2026-07-15 yarn dato:landing:finalize
```

Finalize:

1. перевіряє всі 12 static fields;
2. звіряє current і published content із legacy blocks;
3. завершується без змін при будь-якій невідповідності;
4. видаляє тільки `Service.landing_sections`;
5. повторно перевіряє current і published static content.

Finalize не видаляє section/helper block models, оскільки вони використовуються static fields.

## Rollback

```bash
DATOCMS_ENVIRONMENT=main-copy-2026-07-15 yarn dato:landing:down
```

Rollback:

1. відновлює `landing_sections`, якщо його вже видалено;
2. копіює static blocks назад у modular field у фіксованому порядку;
3. зберігає publication state;
4. видаляє 12 static fields;
5. повертає `icon_key` до built-in select зі 120 options;
6. видаляє private plugin.

Rollback не видаляє block models або media assets. Якщо legacy і static content одночасно заповнені, наявний legacy масив не перезаписується.

## Production rollout

Поточний sandbox не промотити. Для production:

1. Увімкнути Maintenance Mode.
2. Зробити новий Fork актуального primary.
3. Змінити environment guard на точну назву нового sandbox.
4. Застосувати Phase 1.
5. Порівняти records, uploads, locales, plugins і publication states з актуальним primary.
6. Задеплоїти frontend і picker.
7. Виконати повний QA.
8. Виконати Phase 2.
9. Лише після окремого підтвердження промотити новий sandbox.
10. Зберегти попередній primary як rollback environment.

## Чого не робити

- Не запускати scripts без точної назви sandbox.
- Не послаблювати primary/environment guards.
- Не видаляти `landing_sections` вручну.
- Не завантажувати icon SVG у Media Library.
- Не створювати Icon records.
- Не змінювати plugin URL на незадеплоєний endpoint перед finalize.
- Не промотити `main-copy-2026-07-15`.
- Не копіювати API tokens у prompt, Git diff, logs або документацію.

## Відомі не пов'язані warnings

- `gatsby-plugin-react-helmet` migration warning.
- Browserslist `caniuse-lite` warning.
- Bootstrap Sass function-unit warnings.
- React Bootstrap `SSRProvider` warning.
- Hotjar працює лише через HTTPS на production.
- Поточний demo має duplicate Meta Pixel warning.
