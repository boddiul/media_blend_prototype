function createTable(W, H) {
    // Create the table element
    var table = document.createElement('table');

    for (var i = 0; i < H; i++) {
        // Create a new row for each iteration
        var row = document.createElement('tr');
        
        for (var j = 0; j < W; j++) {
            // Create a new cell for each iteration
            var cell = document.createElement('td');

            // Randomize the background color of the cell
            var color = Math.random() < 0.7 ? "#32CD32" : "#DCDCDC";

            cell.style.backgroundColor = color;

            // Add the cell to the row
            row.appendChild(cell);
        }

        // Add the row to the table
        table.appendChild(row);
    }

    

    table.className = "bingo-table-small";
    // Add styles to make cells square and equal in size
    var cells = table.getElementsByTagName('td');
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.width = '20px';
        cells[i].style.height = '20px';
    }

    // Append the table to the body (or to any other container)
    return table;
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
    
    let usersData = JSON.parse(localStorage.getItem("MBPusersData"));


    let data = JSON.parse(localStorage.getItem("MBPcommentsData"))[articleId];

    const commentCount = document.getElementById('commentCount');
    const comments = document.getElementById('comments');

    // Fill the comments count
    commentCount.textContent = data.length + ' comments';

    // Clear the comments
    comments.innerHTML = '';

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

        // Create the user name
        const userName = document.createElement('div');
        userName.className = 'user-name';
        userName.textContent = usersData[comment.user_id].name;
        commentHeader.appendChild(userName);

        // Create the comment text
        const commentText = document.createElement('div');
        commentText.className = 'comment-text';
        commentText.innerHTML = comment.text;
        commentDiv.appendChild(commentText);


        if (comment.bingo_data !== undefined)
        {
            let t = createTable(5, 5);
            commentText.appendChild(t);
        }




        // Add the comment div to the comments container
        comments.appendChild(commentDiv);
    });
}



function updateUserDiv()
{

    let userId = localStorage.getItem("MBPcurrentUser");

    
    let usersData = JSON.parse(localStorage.getItem("MBPusersData"));
    document.querySelector('#account-name').innerHTML = usersData[userId].name;
    document.querySelector('#score-number').innerHTML = usersData[userId].score.toFixed(1);
}

