console.log('hello chesstempo');

let observer = new MutationObserver(waitForSessionData);
observer.observe(document, {subtree: true, childList: true});

/**
 * Form URL:
 * https://docs.google.com/forms/d/e/1FAIpQLSdAbD54b89HQ2nnJCogA9xywM6xipZRW-Ypmv4yrRe7zfkHjw/viewform?usp=pp_url&entry.519527697=firstLast&entry.1865490181=chesstempo.com&entry.998935734=2022-01-02&entry.352418711=111&entry.431322962=222&entry.1222723949=3333&entry.246485611=4444&entry.1207811428=55&entry.1471852977=comments
 */
/**
 * PAGE ELEMENTS:
 * apparently the ct number can change. booooo
 * endsession button doesn't seem to change though
 * 
 * end session: id = ct-56
 * 
 * total rating change: id = ct-192
 * ct-session-summary-table
 * time: class = ct-elev--z1
 * <ct-clock count-up="true" show-fractional="false" set-title="false" 
 * always-show-seconds="true" data-id="problem-session" class="ct-elev--z1 ct-clock-ticking" 
 * role="timer">21:12</ct-clock>
 * 
 * <ct-clock count-up="true" show-fractional="false" set-title="false"
 *  always-show-seconds="true" data-id="tactics" class="ct-elev--z4 ct-clock-not-ticking"
 *  role="timer">00:23</ct-clock>
 * result rating: id=ct-195
 * class = ct-rating-result-rating; there's 2 of these, probably the first 1 is a good bet
 */

let rating = document.getElementsByClassName('ct-rating-result-rating')[0];
let endSession = document.getElementById('ct-56');
let time = document.getElementsByClassName('ct-elev--z1')[0];
let change = document.getElementsByClassName('ct-session-summary-table')[0];

function waitForSessionData(){
    console.log('waiting for session data...');
    if(endSession == null)
        endSession = document.getElementById('ct-56');
    if(rating == null)
        rating = document.getElementsByClassName('ct-rating-result-rating')[0];
    if(time == null)
        time = document.getElementsByClassName('ct-elev--z1')[0];   
    if(change == null)
        change = document.getElementsByClassName('ct-session-summary-table')[0];

    if(endSession != null && rating != null && time != null && change != null){
        change = change.children[1].children[0].children[1];
        console.log('observer ending...');
        console.log(rating);
        console.log(endSession);
        console.log(time);
        console.log(change);
        observer.disconnect();        
    }
}