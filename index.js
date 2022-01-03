/**
 * Chesstempo Session Data Scraper
 * for GT Chess Club 100 Days of Tactics
 * yee
 */

const URL_TEMPLATE = 'https://docs.google.com/forms/d/e/1FAIpQLSdAbD54b89HQ2nnJCogA9xywM6xipZRW-Ypmv4yrRe7zfkHjw/viewform?usp=pp_url&entry.519527697=--NAME--&entry.1865490181=chesstempo.com&entry.998935734=--DATE--&entry.352418711=--CORRECT--&entry.431322962=--INCORRECT--&entry.1222723949=--INITIAL--&entry.246485611=--FINAL--&entry.1207811428=--TIME--&entry.1471852977=comments'
let observer = new MutationObserver(waitForButton);
let firstLast = 'no name set';
let endSession = document.getElementsByClassName('ct-problem-end-session-button')[0];

observer.observe(document, {subtree: true, childList: true});

chrome.storage.local.get('user_name', function(result){
    console.log(result);
    firstLast = result.user_name;
});

function waitForButton(){
    if (endSession == null)
        endSession = document.getElementsByClassName('ct-problem-end-session-button')[0];
    if (endSession != null){
        endSession.addEventListener('click', collectData);
        console.log('found end session button...');
        console.log(endSession);
        observer.disconnect();
    }
}

function collectData(){
    let rating = document.getElementsByClassName('ct-rating-result-rating')[0];
    let time = document.getElementsByClassName('ct-elev--z1')[0];
    let change = document.getElementsByClassName('ct-session-summary-table')[0];    
    let correctDone = document.getElementsByClassName('ct-session-summary-correct-done')[0];

    const finalRating = parseInt(rating.innerHTML);
    const totalCorrect = correctDone.innerHTML.split('/');
    const correct = parseInt(totalCorrect[0]);
    const incorrect = parseInt(totalCorrect[1]) - correct;
    const totalChange = change.children[1].children[0].children[1].innerHTML;
    const initialRating = finalRating - parseInt(totalChange);

    //TODO: make sure handling hour long session works correctly
    let timeValues = time.innerHTML.split(':');
    let totalTime = 0;
    if (timeValues.length > 2){
        let hour = parseInt(timeValues[0]);
        totalTime = 60 * hour + parseInt(timeValues[1]);
    }
    else totalTime = parseInt(timeValues[0]);
    
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    let today = new Date();
    const offset = today.getTimezoneOffset();
    today = new Date(today.getTime() - (offset*60*1000));
    let date = today.toISOString().split('T')[0];

    let form_URL = URL_TEMPLATE.replace('--NAME--', firstLast)
                       .replace('--DATE--', date)
                       .replace('--CORRECT--', correct)
                       .replace('--INCORRECT--', incorrect)
                       .replace('--INITIAL--', initialRating)
                       .replace('--TIME--', totalTime)
                       .replace('--FINAL--', finalRating);
    
    // https://docs.google.com/forms/d/e/1FAIpQLSdAbD54b89HQ2nnJCogA9xywM6xipZRW-Ypmv4yrRe7zfkHjw/viewform?usp=pp_url&entry.519527697=--NAME--&entry.1865490181=chesstempo.com&entry.998935734=--DATE--&entry.352418711=--CORRECT--&entry.431322962=--INCORRECT--&entry.1222723949=--INITIAL--&entry.246485611=--FINAL--&entry.1207811428=--TIME--&entry.1471852977=comments
    window.open(form_URL, '_blank');
}