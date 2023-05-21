




function updateUsersListDiv() {
    let usersData = JSON.parse(localStorage.getItem("MBPusersData"));
    console.log(usersData)


    let users = [];

    for (const [key, value] of Object.entries(usersData)) {
        users.push(value);
    }

    users.sort(function(a,b) {return b.score-a.score});

    let userInfoDiv = document.querySelector('.user-info');
    userInfoDiv.innerHTML = '';


    for (let i=0;i<users.length;i++)
    {
        let userAvatar = '../assets/user'+users[i].avatar_id+'.svg';
        let userName = users[i].name;
        let userScore = users[i].score.toFixed(1);

        let userIcon = "";


        let rankToIcon = {
            1 : "crown",
            2 : "crown_top"
        }

        console.log(users[i])
        if (users[i].rank>0)
        {
            userIcon = `
                    <svg class="name-rank" height="16" width="16">
                        <image xlink:href="../assets/${rankToIcon[users[i].rank]}.svg" height="16"/> 
                    </svg>
                    `
        }

        
        let userId = localStorage.getItem("MBPcurrentUser");

        // Create the HTML string
        let userHTML = `
            <div class="user ${users[i].id===userId ? "current":""}">
                <svg class="user-avatar" height="50" width="50">
                    <image xlink:href="${userAvatar}" height="50"/> 
                </svg>
                <div class="name-icon-container">
                    ${userIcon}
                    <span class="user-name">${userName}</span>
                </div>
                <span class="user-score">${userScore}</span>
            </div>`;
        
        // Add the HTML to the page
        userInfoDiv.insertAdjacentHTML('beforeend', userHTML);
        
    }
    



}


updateUserDiv();

updateUsersListDiv();