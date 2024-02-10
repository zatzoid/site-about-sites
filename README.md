# site-about-sites
Сайт с моими публичными репозиториями.
## Стэк
- scss
- jq

## Как это работает.
- При загрузке страницы осуществляется fetch запрос к гитхабу по юзеру на эндпоинт /repos для получения массива репозиториев.

- При успешном ответе идет второй запрос на каждый элемент массива, на /contents,  для нахождения в репозитории файла preview.jpg,
если файл найден, в объект репозитория добавляется свойство с ссылклой на изображение. После чего объект начинает отрисовку.

- При нажатии на кнопку "Развернуть", идет запрос на /contents/README.md .
При успешном ответе полученный объект декодируется и конвертируется из формата Markdown в html при помощи библиотеки [marked](https://github.com/markedjs/marked), после чего добавляется в контейнер для описания.
  +  из описания при помощи регулярного выражения достается ссылка на ghpage , и добавляется в шапку описания.
  +  тэги h1 заменяются на h3 для семантики

## Верстка
- Адаптирована под мобилку.
- Сетка построена на flex row, картчоки позиционируются абсолютно, при помощи якорей.
   + `<li class='grid__el'> //якорь который передает свои размеры и позицию  `
    + `<div class='grid__el-position'>  //блок который позиционируется абсолютно относительно сетки и  принимает размеры с позицией от родителя`
 
  
  - Cелекторы классов заданы по БЭМ
