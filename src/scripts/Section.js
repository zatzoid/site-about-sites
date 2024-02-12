import $ from "jquery";

export default class Section {
    constructor(createCard) {
        this._createCard = createCard
        this._section = $('.grid-section');
        this._cardContainer = $('.grid');
        this._sectionPreloader = $(` <li class="grid__el-preloader"> <div class="preloader"></div>  </li>`);
        this._sectionErrorMsg = $(` <li class="grid__el-preloader"> 
        <p class="grid__el-error-msg"></p> 
        <p class="grid__el-error-save">
        Вы можете ознакомиться с моими работы на 
        <a target='_blank' href='https://github.com/zatzoid'> Github</a>
        </p>
        
        </li>`);
        this._sectionFindReset = $('.grid__filter-find-btn-reset');
        this._sectionFindInput = $('.grid__filter-find-input');
        this._sectionFindSelect = $('.grid__filter-sort');
        this._sectionRepoCountLoad = $('.grid__info-data-load');
        this._sectionRepoCountVisible = $('.grid__info-data-visible');
        this._sectionHeadingPlaceHolder = $('.grid__heading-placeholder')


    }
    showSectionPreloader() {
        $(this._cardContainer).append(this._sectionPreloader);
    }
    hideSectionPreloader() {
        $(this._cardContainer).find(this._sectionPreloader).remove();
    }
    sectionApiError(error) {
        if(error === 403){
            $(this._sectionErrorMsg).find('.grid__el-error-msg').text(`Ошибка 403. Превышен лимит запросов, попробуйте позже`)

        }else{
            $(this._sectionErrorMsg).find('.grid__el-error-msg').text(`Ошибка: ${error}`)
        }

        $(this._cardContainer).append(this._sectionErrorMsg);
        $(this._sectionErrorMsg).show()
    }
    renderItem(item) {
        $(this._cardContainer).append(item);
        this.hideSectionPreloader()
        this._setPosition(item);

    }
    putRepoList(list) {
        this._repoList = list
        this._filtedList = list
        this._setRepoVisibleCount(list)
    }
    moveAllCards() {
        const itemList = $(this._cardContainer).find('.grid__el').toArray();
        itemList.forEach(el => {
            this._setPosition(el)
        });

    }
    _setPosition(item) {
        this._cardPos = $(item).find('.grid__el-position');
        this._cardContent = $(item).find('.grid__el-content');
        $(this._cardPos).css({ top: $(item)[0].offsetTop, left: $(item)[0].offsetLeft, width: $(item)[0].offsetWidth, height: $(item)[0].offsetHeight });

    }
    setSectionListeners() {
        $(this._sectionFindInput).on('input', (e) => {
            this._searchElements(e.currentTarget.value)
        })
        $(this._sectionFindReset).on('click', () => {
            $(this._sectionFindInput).val('')
            this._searchElements('')

        })
        $(this._sectionFindSelect).on('change', (e) => {
            this._sortElements(e.currentTarget.value)
        })
        $(window).on('scroll', () => {
            this._headingPositionListener()
        })
        $(window).on('resize', () => {
            setTimeout(() => {
                this.moveAllCards()
            }, 1000);

        })

    }
    _searchElements(data) {
       
        if (data.length > 0) {
            $(this._sectionFindReset).addClass('grid__filter-find-btn-reset_active')
            const filterParam = () => {
                if (data.toLowerCase() === 'js') {
                    return 'javascript'
                } else {
                    return data.toLowerCase()
                }
            }
            const filteredListLang = this._filtedList.filter((el) => {
                return el.language.toLowerCase().includes(filterParam());
            });
            const filtedListName = this._filtedList.filter((el) => {
                return el.name.toLowerCase().includes(data.toLowerCase());
            });
            const newFiltedList = new Set([...filteredListLang, ...filtedListName]);
            const combinedList = Array.from(newFiltedList);
            this._filtedList = combinedList
            this._cardContainer.empty()
            if (combinedList.length > 0) {
                this._setRepoVisibleCount(combinedList)
                combinedList.forEach(el => {
                    this.renderItem(this._createCard(el))
                })
            } else {
                $(this._sectionErrorMsg).find('.grid__el-error-msg').text(`Ничего не найдено`);
                $(this._cardContainer).append(this._sectionErrorMsg);
                this._setRepoVisibleCount([])
            }
        } else {
            this._filtedList = this._repoList
            $(this._sectionFindReset).removeClass('grid__filter-find-btn-reset_active')
            this._cardContainer.empty()
            this._repoList.forEach(el => {
                this.renderItem(this._createCard(el))

            })
            this._setRepoVisibleCount(this._repoList)

        }
    }
    _sortElements(data) {
        if (data === 'dateNew') {
            const newList = this._filtedList.sort((a, b) => {
                const aDate = Date.parse(a.updated_at);
                const bDate = Date.parse(b.updated_at);
                return bDate - aDate
            });
            this._cardContainer.empty();
            newList.forEach(el => {
                this.renderItem(this._createCard(el))
            })
        } else if (data === 'dateUpd') {
            const newList = this._filtedList.sort((a, b) => {
                const aDate = Date.parse(a.pushed_at);
                const bDate = Date.parse(b.pushed_at);
                return bDate - aDate
            });
            this._cardContainer.empty();
            newList.forEach(el => {
                this.renderItem(this._createCard(el))
            })
        } else if (data === 'lang') {
            const newList = this._filtedList.sort((a, b) => {

                return a.language.localeCompare(b.language)
            });
            this._cardContainer.empty();
            newList.forEach(el => {
                this.renderItem(this._createCard(el))
            })
        }


    }
    setRepoLoadCount(list) {
        $(this._sectionRepoCountLoad).text(`Загружено репозиториев: ${list.length}`)

    }
    _setRepoVisibleCount(list) {
        $(this._sectionRepoCountVisible).text(`Отображается репозиториев: ${list.length}`)
    }
    _headingPositionListener() {

        const el = $(this._sectionHeadingPlaceHolder)[0];
        const elPos = el.offsetTop + el.offsetHeight
        if (window.scrollY >= elPos) {
            $(el).children().addClass('grid__heading_fixed')
        } else {
            $(el).children().removeClass('grid__heading_fixed')
        }


    }



}

