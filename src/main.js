import $, { error } from "jquery";
import './index.css';
import './fonts/fonts.css';
import './scripts/bg.js';
import { api } from "./scripts/API";
import Section from "./scripts/Section";
import Card from "./scripts/Card";


let repoList






const createCard = (cardData) => {

    const cardObj = new Card(cardData, getReadeMe, moveCards, getRepoContent,);
    const cardEl = cardObj.createCard();
    return cardEl
}
const section = new Section(createCard);

getAllRepo(localStorage.getItem('repos'));
$('.grid__refresh').on('click', ()=>getAllRepo());
$('.footer__container-sunset').on('change', sunset)
checkTimeLocalStorrage();

// сделать кнопку рефреша
async function getAllRepo(localSttore = null) {
    try {
        loading()

        const ls = localSttore



        if (!ls) {

            repoList = await api.getAllRepos();
            let prevNewId = 0
            let currNewDate = repoList[0].pushed_at
            for (let i = 0; i < repoList.length; i++) {

                if (repoList[i].pushed_at > currNewDate) {
                    currNewDate = repoList[i].pushed_at
                    prevNewId = i
                }

                new Promise(async (resolve, reject) => {
                    await api.getRepoPreviewImg(repoList[i].name)
                        .then((res) => {
                            resolve(res)
                        }).catch((e) => {
                            reject(`repo: ${repoList[i].name}, dosent have prview img`)
                        })


                }).then((res) => {

                    repoList[i] = { ...repoList[i], previewImg: res.download_url }
                    localStorage.setItem('repos', JSON.stringify(repoList))
                    const domEl = $(`li.grid__el[data-index="${repoList[i].id}"]`);

                    if (domEl) {
                        domEl.find('.grid__el-img-data').attr('src', res.download_url)
                    }
                }).catch((e) => {
                    console.log(e);
                })

            }

            repoList[prevNewId].newest
            repoList[prevNewId].newest = true


        } else {
            repoList = await JSON.parse(ls)
        }


        section.renderItems(repoList)
        section.putRepoList(repoList)
        section.setSectionListeners()


    }
    catch (e) {
        console.error('error::', e)
        section.sectionApiError(e)
        section.hideSectionPreloader();
    }
    finally {
        section.hideSectionPreloader();
    }
}

function checkTimeLocalStorrage() {
    //Отчистка ls после 10 дней
    const ls = localStorage.getItem('date')

    const date = new Date();
    const str = date.toISOString().split('T')[0].split('-').slice(1)
    const curDaySumm = str.reduce((acc, curr) => {
        if (acc <= 0) {
            curr = curr * 30
        }
        acc = Number(curr) + acc
        return acc
    }, 0)
    if (!ls) {

        localStorage.setItem('date', JSON.stringify(curDaySumm))
    } else if (ls - curDaySumm > 10 || ls - curDaySumm > 10) {
        localStorage.clear()
        localStorage.setItem('date', JSON.stringify(curDaySumm))
    }
}
function sunset(evt) {
    $('.grid__el').toArray().forEach((el) => {
        $(el).css({ opacity: `${evt.target.checked ? 0 : 1}` })
    })
    $('.grid__heading-placeholder').css({ opacity: `${evt.target.checked ? 0 : 1}` })
}

function getReadeMe(repo) {
    return api.getRepoReadMe(repo)
}
function getRepoContent(repo) {
    return api.getRepoContent(repo)
}
function moveCards() {
    section.moveAllCards();
}
function loading() {
    $('.grid__refresh').attr('dissabled', true);
    section.showSectionPreloader();
}





