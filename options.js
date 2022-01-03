
let nameForm = document.getElementById('nameForm');
let nameValue = document.getElementById('nameValue');
let storedName = document.getElementById('storedName');

nameForm.addEventListener('submit', saveName);
chrome.storage.local.get('user_name', function(result) {

    if(result.hasOwnProperty('user_name'))
        storedName.innerHTML = 'your name: ' + result.user_name;

});

function saveName(){
    chrome.storage.local.set({'user_name': nameValue.value});
}
