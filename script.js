let btn = document.getElementById('submitBtn');
let key = '@#$%^&*()';
let passwordsArray = [];
let table = document.getElementById('table');
if (localStorage.getItem(key) !== null) {
    
    console.log(passwordsArray);
    passwordsArray = JSON.parse(localStorage.getItem(key));
    let str = "";
    for (let eachPass of passwordsArray) {
        str += tableFormat(eachPass);
    }
    table.innerHTML += str;
}

function deletePass(website){
    let findIndex = function () {
        for (let obj of passwordsArray) {
            if (obj.Website === website) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    passwordsArray.splice(findIndex, 1);
    localStorage.setItem(key,JSON.stringify(passwordsArray));
    updateTable();
}
function updateTable() {
    let prev = table.innerHTML;
    let str = "";
    for (let row of passwordsArray) {
        str += tableFormat(row);
    }
    let tableHeading = `
            <tr>
                <th>Time Stamp</th>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Encrypted Password</th>
                <th>Delete</th>
            </tr>`;
    table.innerHTML = tableHeading + str;
}
let eyeSymbol = document.getElementById('eyeSymbol');
let visible = false;
let visibleDataTable = table.innerHTML;
table.innerHTML = "";
eyeSymbol.addEventListener('click',
    function () {
        if (visible === true) {
            eyeSymbol.src = 'images/hidden.png';
            visibleDataTable = table.innerHTML;
            table.innerHTML = "";
            visible = false;
        }
        else {
            eyeSymbol.src = 'images/eye.png';
            visible = true;
            table.innerHTML = visibleDataTable;
        }
    }
)

btn.addEventListener('click', (e) => {
    //it is used to not for submit which means not to reload
    e.preventDefault();
    let table = document.getElementById('table');
    let website = document.getElementById('website');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let encryption = document.getElementById('encryptionInput');
    let websiteValue = website.value;
    let usernameValue = username.value;
    let passwordValue = password.value;
    let encryptionValue = encryption.checked;
    if (usernameValue === "" || passwordValue === "") {
        alert('Invalid Input');
        return;
    }
    website.value = "";
    username.value = "";
    password.value = "";
    for (let eachPass of passwordsArray) {
        if (eachPass.Website === websiteValue) {
            alert('Exists');
            return;
        }
    }
    let newPass = {
        timeStamp: new Date().toLocaleString(),
        Website: websiteValue,
        Username: usernameValue,
        Password: passwordValue,
        Encrypted: encryptionValue
    };
    passwordsArray.push(newPass); 
    console.log(passwordsArray);
    table.innerHTML = table.innerHTML + tableFormat(newPass);
    localStorage.setItem(key, JSON.stringify(passwordsArray));
    updateTable();
});

function maskPassword(Password) {
    let str = "";
    for (let index = 0; index < Password.length; index++) {
        str += "*";
    }
    return str;
}

function tableFormat(obj) {
    let Password = obj.Password;
    
    
    return `
    <tr>
        <td>
        <div>
       
            ${obj.timeStamp} 
             <img src="copy.svg" onclick="copyText('${obj.timeStamp}')" alt="Copy Icon" width="10" height="10"> 
                         
        </div>
            </td>
        <td>
            ${obj.Website}
            <img src="copy.svg" onclick="copyText('${obj.Website}')" alt="Copy Icon" width="10" height="10">            
        </td>
        <td>
            ${obj.Username}
            <img src="copy.svg" onclick="copyText('${obj.Username}')" alt="Copy Icon" width="10" height="10">            
        </td>
        <td>
            ${maskPassword(obj.Password)}
            <img src="copy.svg" onclick="copyText('${obj.Password}')" alt="Copy Icon" width="10" height="10">            
        </td>
        <td>
            ${obj.Encrypted}
            <img src="copy.svg" onclick="copyText('${obj.Encrypted}')" alt="Copy Icon" width="10" height="10">            
        </td>
        <td>
            <button class='btn-delete' onclick="deletePass('$(eachPass.Website)')"> Delete </button>
        </td>
    </tr>
    `;
}

function copyText(txt) {
    navigator.clipboard.writeText(txt);
    let copiedStatus = document.getElementById('copiedStatus');
    copiedStatus.textContent = 'Copied';
    copiedStatus.classList.add('copied-status');
    copiedStatus
    setTimeout(function () {
        copiedStatus.textContent = "";
    },1000);
}