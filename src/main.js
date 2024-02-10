import $, { error } from "jquery";
import './index.css';
import './fonts/fonts.css';
import './scripts/bg.js';
import { api } from "./scripts/API";
import Section from "./scripts/Section";
import Card from "./scripts/Card";


let repoList

const createCard = (cardData) => {

    const cardObj = new Card(cardData, getReadeMe, moveCards,  getRepoContent, );
    const cardEl = cardObj.createCard();
    return cardEl
}
const section = new Section(createCard);

async function getAllRepo() {
    try {
        section.showSectionPreloader();
        const repoResponse = await api.getAllRepos();
        /* загрузка изображений и внедрение ссылок на них в объекты */  
        const repoListUPDcontent = await Promise.all(
            repoResponse.map(async (repo) => {
                const contentData = await api.getRepoContent(repo.name);
                const hasPrevieImg = contentData.find(el => el.name.toLowerCase() === 'preview.jpg');
                if (hasPrevieImg) {
                    const currentRepo = repoResponse.find(el => el.id === repo.id);
                    const index = repoResponse.findIndex(el => el.id === currentRepo.id);
                    currentRepo.previewImg
                    currentRepo.previewImg = hasPrevieImg.download_url;
                    repoResponse[index] = currentRepo

                }
            }))

        repoResponse.forEach(el => {
            checkLanguage(el)

        })
        repoList = repoResponse;
        section.setRepoLoadCount(repoList);
        repoList.forEach(el => {
            section.renderItem(createCard(el))
        });
        section.putRepoList(repoList);
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

function getReadeMe(repo) {
    return api.getRepoReadMe(repo)
}
function getRepoContent(repo) {
    return api.getRepoContent(repo)
}
function moveCards() {
    section.moveAllCards();
}

function checkLanguage(el) {
    if (el.language === 'JavaScript') {
        const checkName = ['React', 'BudgetBuddy', 'Vue'];
        let matchName
        for (let i = 0; i < checkName.length; i++) {
            if (el.name.toLowerCase().includes(checkName[i].toLowerCase())) {
                matchName = checkName[i]
                break
            }
        }

        if (matchName) {
            const lang = matchName === 'BudgetBuddy' ? 'React' : matchName
            el.language = lang;
            return el
        }


    } else {
        return el
    }
}


getAllRepo();


/* console.log(decodeURIComponent(escape(atob()))) */