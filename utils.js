const BINGO_SIZE = 4;


function createComment(articleId,userId,text,bingo) {


    console.log(articleId,userId,text)


    let commentsData = JSON.parse(localStorage.getItem("MBPcommentsData"));


    commentsData[articleId].unshift({user_id:userId,text:text,bingo_data:bingo})

    localStorage.setItem("MBPcommentsData", JSON.stringify(commentsData));


    if (bingo)
        showScoreInc("Created Bingo",50);
    else
        showScoreInc("New comment",10);

}



function clickSubmitComment(articleId)
{

    let userId = localStorage.getItem("MBPcurrentUser");


    let txt = document.getElementById("userComment").value;

    console.log(txt)
    if (txt)
    {

        createComment(articleId,userId,txt,undefined)

        updateCommentsDiv(articleId);
    }

}



function updateUsersRanks() {



    let usersData = JSON.parse(localStorage.getItem("MBPusersData"));


    let dataArray = Object.entries(usersData);

    // Sort the array by score in descending order
    dataArray.sort((a, b) => b[1].score - a[1].score);
    
    // Assign the place based on the sorted position
    dataArray.forEach((item, index) => {
       usersData[item[0]].place = index + 1;


       usersData[item[0]].rank = 0;

       if (usersData[item[0]].score>500)
            usersData[item[0]].rank = 1;

       if (usersData[item[0]].place==1)
            usersData[item[0]].rank = 2;

    });


    localStorage.setItem("MBPusersData", JSON.stringify(usersData));
    




}


function updateArticleDiv(articleId) 
{

    
    let articlesData = JSON.parse(localStorage.getItem("MBParticlesData"));

    console.log(articlesData)
    let data = articlesData[articleId];


    const articleTitle = document.getElementById('articleTitle');
    const articleDate = document.getElementById('articleDate');
    const articleImage = document.getElementById('articleImage');
    const articleText = document.getElementById('articleText');


    articleTitle.textContent = data.title;
    articleDate.textContent = data.date;
    articleImage.src = "../assets/"+data.image;
    articleText.innerHTML  = data.text.replace(/\n/g, '<br>');
}



function updateCommentsDiv(articleId)
{

    
    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"))




    let usersData = JSON.parse(localStorage.getItem("MBPusersData"));


    let data = JSON.parse(localStorage.getItem("MBPcommentsData"))[articleId];

    const commentCount = document.getElementById('commentCount');
    const comments = document.getElementById('comments');

    // Fill the comments count
    commentCount.textContent = data.length + ' comments';

    // Clear the comments
    comments.innerHTML = '';

    let commentId = 0;

    // Loop through each comment in the data
    data.forEach(function(comment) {
        // Create a new comment div
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        // Create a comment header div
        const commentHeader = document.createElement('div');
        commentHeader.className = 'comment-header';
        commentDiv.appendChild(commentHeader);

        




        // Create the avatar image
        const avatarImg = document.createElement('img');
        avatarImg.className = 'comment-avatar';
        avatarImg.src = "../assets/user"+usersData[comment.user_id].avatar_id+".svg";
        commentHeader.appendChild(avatarImg);


        let iconT = "";

        
        let rankToIcon = {
            1 : "crown",
            2 : "crown_top"
        }
        let r = usersData[comment.user_id].rank;


        if (r!=0)
            iconT = `<svg height="14" width="14" style="margin-right:7px">
                <image xlink:href="../assets/${rankToIcon[r]}.svg" height="14"/> 
                </svg>`

        // Create the user name
        const userName = document.createElement('div');
        userName.className = 'user-name';
        userName.innerHTML = iconT+usersData[comment.user_id].name;
        commentHeader.appendChild(userName);

        // Create the comment text
        const commentText = document.createElement('div');
        commentText.className = 'comment-text';
        commentText.innerHTML = comment.text;
        commentDiv.appendChild(commentText);


        if (comment.bingo_data !== undefined)
        {
            
                


            let t = createTable(articleId,BINGO_SIZE, BINGO_SIZE,commentId);
            commentText.appendChild(t);
        }




        // Add the comment div to the comments container
        comments.appendChild(commentDiv);

        commentId += 1;
    });
}

let currentScore = null;
let visibleScore = null;

function updateUserDiv()
{

    if (currentScore===null)
    {

        let userId = localStorage.getItem("MBPcurrentUser");

    
        let usersData = JSON.parse(localStorage.getItem("MBPusersData"));
        document.querySelector('#account-name').innerHTML = usersData[userId].name;
        document.querySelector('#score-number').innerHTML = usersData[userId].score.toFixed(1);
    
        currentScore = usersData[userId].score;
        visibleScore = currentScore;
    }
    else if (visibleScore<currentScore)
    {
        visibleScore+=1;
        document.querySelector('#score-number').innerHTML = visibleScore.toFixed(1);

    }

}



function showScoreInc(text,score) 
{

    var popup = document.getElementById("score-popup");
    var textDiv = document.getElementById("score-text");
    var valueDiv = document.getElementById("score-value");

    // Setting the text and score
    textDiv.textContent = text;
    valueDiv.textContent = '+' + score.toString();

    // Removing the hidden class and adding the show class
    popup.classList.remove("score-popup-hidden");
    popup.classList.add("score-popup-show");

    // After a delay, hide the popup again
    setTimeout(function() {
        popup.classList.remove("score-popup-show");
        popup.classList.add("score-popup-hidden");
    }, 3000);  // Change this value to adjust the delay



    currentScore += score;
}