import $ from "jquery";
const marked = require('marked')
import defaultImg from '../assets/no-image.svg';


export default class Card {
    constructor(cardData, getReadeMe, moveCards, getRepoImg, getRepoContent) {
        this._cardData = cardData
        this._getReadeMe = getReadeMe
        this._moveCards = moveCards
        this._getRepoImg = getRepoImg
        this._getRepoContent = getRepoContent


        //position - позиционируется абослютно относительно сетки
        //content - оберкта для конетна
        this.cardDom = $(`  <li class="grid__el">
        <div class='grid__el-position'> 
            <div class='grid__el-content '>
        
                <div class='grid__el-date'> 
                    <p class="grid__el-date-data "></p>
                    <p class="grid__el-date-data "></p>
                    <p class="grid__el-date-data grid__el-date-data_newest"></p>
                </div>
                <button class="grid__el-showMore-btn">
                    <label class="grid__el-showMore-btn-label">
                        <input class="grid__el-showMore-btn-input" type="checkbox" name="elShowMore" id="gridEl">
                        <div class="grid__el-showMore-btn-text">
                            <p class="grid__el-showMore-btn-text-data ">свернуть</p>
                            <p class="grid__el-showMore-btn-text-data ">развернуть</p>
                        </div>
                    </label>
                </button>
                <div class="grid__el-img scrollBar">
                    <img class="grid__el-img-data" src="." alt="alt">
                </div>
                <div class="grid__el-desc">
                    <div class="grid__el-desc-lang">
                        <p class="grid__el-desc-lang-data retroWave-marker"></p>
                    </div>
                    <div class="grid__el-desc-content">
                    <div class='grid__el-desc-content-heading'>
                        <h2 class="grid__el-desc-content-heading-name retroWave-head"></h2>
                        <div class="grid__el-desc-content-heading-links"> </div>
                        </div>
                        <div class="grid__el-desc-content-body scrollBar"> </div>
                    </div>
                </div>


            </div>
        </div>
    </li>`)
        this._cardDescText = $(`<p class="grid__el-desc-content-body-data"></p>`);
        this._cardDescLink = $(`<a href="#" class="grid__el-desc-content-link"></a>`);
        this._cardDescPreloader = $(`<div class="preloader"></div>`);
        this._cardHeadingLink = `<a href='#' target='_blank' class='grid__el-desc-content-heading-link ' > </a>`
        this._cardColor = this._getColor()

    }
    _setCardValue() {
        this._cardLang.text(this._cardData.language);
        this._cardName.text(this._cardData.name);
        this._cardName.attr('title', this._cardData.name);
        this.cardDom.attr('data-index', this._cardData.id);
        this._AddHeadingLink(this._cardData.html_url, 'GitHub', "ссылка на репозиторий")

        const date = (date) => {
            const createDate = new Date(date);
            return `${String(createDate.getDate()).padStart(2, '0')}-${String(createDate.getMonth() + 1).padStart(2, '0')}-${createDate.getFullYear()}`
        }
        $(this._cardDate[0]).text(`создан: ${date(this._cardData.created_at)}`);
        $(this._cardDate[1]).text(`обновлен: ${date(this._cardData.pushed_at)}`);
        if (this._cardData.newest) {
            $(this._cardDate[2]).text(`Newest`).css({ color: `var(--col-${this._cardColor})` });
        }

    }
    _setEventListeners() {
        $(this._cardBtn).on('change', (checkbox) => {
            $(this._cardMain).toggleClass('grid__el_active', checkbox.target.checked);
            this._moveCards();
            $(this._cardContent).trigger('mouseleave');
            if (checkbox.target.checked) {
                $(this._cardDate).parent().css({ paddingLeft: `${(this._cardLang)[0].offsetWidth + 30}px` })
            } else {
                $(this._cardDate).parent().css({ paddingLeft: `15px` })
            }

        });
        const openCard = () => {
            this._setRepoInfo();
            $(this._cardBtn).off('click', openCard);
        }
        $(this._cardBtn).on('click', openCard);
        /*    $(this._cardMain).on('click', () => {
               console.log(this._cardData);
           }) */

        $(this._cardContent).hover(() => {
            if ($(this._cardBtn)[0].checked === false) {
                $(this._cardContent).css({
                    boxShadow: `0px 0px 25px 5px #e22076`
                })
            }
        },
            () => {
                $(this._cardContent).css({
                    boxShadow: `0px 0px 0px 0px #e22076`
                })
            }
        )


    }
    _getColor() {
        switch (this._cardData.language.toLowerCase()) {
            case 'vue': return 'green';
            case 'javascript': return 'yellow';
            case 'react': return 'blue'
            case 'typescript': return 'dark-blue'
            default: return 'unknown'
        }
    }
    _setUniqueEffects() {
        $(this._cardContent).find('.grid__el-desc-lang').css({ color: `var(--col-${this._cardColor})` });

    }
    _AddHeadingLink(url, text, title) {
        const newLink = $(this._cardHeadingLink)
        newLink.attr('href', url);
        newLink.attr('title', title);
        newLink.text(text);
        newLink.append(`<span class='linkTo-image'></span>`)
        this._cardNameLinks.append(newLink)
    }
    async _setRepoInfo() {
        let ls = localStorage.getItem('readMe');
        if (ls) {
            ls = await JSON.parse(ls);
        } else {
            ls = {}
        }

        try {
            $(this._cardBtn).attr('disabled', true)
            $(this._cardDesc).append(this._cardDescPreloader)

            const readMeFile = ls[this._cardData.id] ? ls[this._cardData.id] : await this._getReadeMe(this._cardData.name);
            if (!ls[this._cardData.id]) {
                ls = { ...ls, [this._cardData.id]: readMeFile }
                localStorage.setItem('readMe', JSON.stringify(ls));
            }
            const decodedRM = decodeURIComponent(escape(atob(readMeFile.content)));
            const markedText = marked.parse(decodedRM);
            const newText = markedText.replace(/<h1/g, '<h3').replace(/<\/h1>/g, '</h3>');
            /* link gh page */
            const getGHlink = this._cardData.homepage
            /* add link to img */
            if (getGHlink) {
                //$(this._cardImg).wrap(`<a href=${getGHlink} target='_blank' class='grid__el-img-link'></a>`)

                if (getGHlink.includes('.github.io')) {
                    this._AddHeadingLink(getGHlink, 'Page', "ссылка на версию сайта выложенную на GitHub Page")
                } else {
                    this._AddHeadingLink(getGHlink, 'Site', "ссылка на версию сайта выложенную где то")
                }
            }

            $(this._cardDesc).append(newText);
            $(this._cardDesc).find('a')
                .css({ color: `var(--col-${this._cardColor})` })
                .addClass('grid__el-desc-content-link')

        }
        catch (e) {
            if (e === 404) {
                $(this._cardDescText).text(`Ошибка 404. Описание отсуствует`)
            } else if (e === 403) {
                $(this._cardDescText).text(`Ошибка 403. Превышен лимит запросов, попробуйте позже`)
            } else {
                $(this._cardDescText).text(`Ошибка при загрузке описания ${e}`)
            }

            $(this._cardDesc).append(this._cardDescText);
            $(this._cardDesc).find(this._cardDescPreloader).remove()
            $(this._cardBtn).attr('disabled', false)
        }
        finally {
            $(this._cardDesc).find(this._cardDescPreloader).remove()
            $(this._cardBtn).attr('disabled', false)
        }
    }
    /*  setCardPreviewImage(link) {
         //string
         $(this._cardImg).attr('src', link)
         this._cardData.previewImg
         this._cardData.previewImg = link
     } */


    _setRepoImg() {
        $(this._cardImg).parent().append(this._cardDescPreloader)
        $(this._cardImg).on('load', () => {
            $(this._cardImg).parent().find(this._cardDescPreloader).remove()
        })
        if (this._cardData.previewImg) {
            $(this._cardImg).attr('src', this._cardData.previewImg)
        } else {
            $(this._cardImg).attr('src', defaultImg)
        }

    }

    createCard() {
        this._cardLang = this.cardDom.find('.grid__el-desc-lang-data');
        this._cardHeadingContainer = this.cardDom.find('.grid__el-desc-content-heading');
        this._cardName = this.cardDom.find('.grid__el-desc-content-heading-name');
        this._cardNameLinks = this.cardDom.find('.grid__el-desc-content-heading-links');
        this._cardImg = this.cardDom.find('.grid__el-img-data');
        this._cardBtn = this.cardDom.find('.grid__el-showMore-btn-input');
        this._cardMain = this.cardDom.find('.grid__el').prevObject[0];
        this._cardDesc = this.cardDom.find('.grid__el-desc-content-body');
        this._cardDate = this.cardDom.find('.grid__el-date-data');
        this._cardPos = this.cardDom.find('.grid__el-position');
        this._cardContent = this.cardDom.find('.grid__el-content');
        this._setCardValue();
        this._setUniqueEffects();
        this._setEventListeners();
        this._setRepoImg();
        return this.cardDom

    }

}
/*     async _setRepoImg() {
           try {
               $(this._cardImg).parent().append(this._cardDescPreloader)
               const getImgRes = await this._getRepoImg(this._cardData.name);
               const img = getImgRes.download_url;
               this._cardImg.attr('src', img);
           }
           catch (e) {
   
               $(this._cardImg).parent().find(this._cardDescPreloader).remove()
               this._cardImg.attr('src', defaultImg);
           }
           finally {
               $(this._cardImg).parent().find(this._cardDescPreloader).remove();
               this._cardImg.attr('alt', this._cardData.name)
           }
       } */

/*async _setRepoImg() {
 
   try {
       $(this._cardImg).parent().append(this._cardDescPreloader);
       const repoContentList = await this._getRepoContent(this._cardData.name);
       const repoImgContent = repoContentList.find(el => el.name.toLowerCase() === 'preview.jpg');

       if (repoImgContent) {
           this._cardImg.attr('src', repoImgContent.download_url);
         

           const img = new Image();
           img.crossOrigin = "Anonymous";
           img.onload = () => {
               const canvas = document.createElement("canvas");
               canvas.width = img.width;
               canvas.height = img.height;

               const ctx = canvas.getContext("2d");
               ctx.drawImage(img, 0, 0);

               canvas.toBlob((blob) => {
                   const url = URL.createObjectURL(blob);
                   sessionStorage.setItem(`${this._cardData.name}`, url);

               }, 'image/jpeg', 0.8);
               img.src = repoImgContent.download_url;
           };
           this._changePreviewImgStatus(this._cardData.id);
       } else {
           throw new Error('Изображение отсутствует');
       }
   } catch (e) {
       $(this._cardImg).parent().find(this._cardDescPreloader).remove();
       this._cardImg.attr('src', defaultImg);
   } finally {
       $(this._cardImg).parent().find(this._cardDescPreloader).remove();
       this._cardImg.attr('alt', this._cardData.name);

   }
} */