const BINGO_SIZE = 5;


function createComment(articleId,userId,text,bingo) {


    console.log(articleId,userId,text)


    let commentsData = JSON.parse(localStorage.getItem("MBPcommentsData"));


    commentsData[articleId].unshift({user_id:userId,text:text,bingo_data:bingo})

    localStorage.setItem("MBPcommentsData", JSON.stringify(commentsData));


}



function clickSubmitComment()
{

    let userId = localStorage.getItem("MBPcurrentUser");


    let txt = document.getElementById("userComment").value;

    console.log(txt)
    if (txt)
    {

        createComment("putin_bingo",userId,txt,undefined)

        updateCommentsDiv("putin_bingo");
    }

}




function createTable(W, H,id) {
    // Create the table element
    var table = document.createElement('table');

    let k = 0;

    for (var i = 0; i < H; i++) {
        // Create a new row for each iteration
        var row = document.createElement('tr');
        
        for (var j = 0; j < W; j++) {

            // Create a new cell for each iteration
            var cell = document.createElement('td');

            cell.id = `bingo_small_${id}_${k}`

            // Randomize the background color of the cell
            //var color = fill[k] ? "#32CD32" : "#DCDCDC";

            cell.style.backgroundColor = "#ffffff";

            // Add the cell to the row
            row.appendChild(cell);

            k+=1;
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

    table.addEventListener("click",function() {showOverlay(id)})

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




function showNewBingoOverlay() {


    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"));
    


    phrases = bingoData["putin_bingo"].start_words
    let overlay = document.getElementById("new-bingo-overlay");
    let content = document.getElementById("new-bingo-phrases");
    let counter = document.getElementById("new-bingo-counter");
    let submit = document.getElementById("new-bingo-submit");

    content.innerHTML = '';
    phrases.forEach((phrase, index) => {
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `new-bingo-checkbox-${index}`;
        checkbox.addEventListener('change', function () {
            let checked = content.querySelectorAll('input:checked');
            counter.textContent = `${checked.length}/${BINGO_SIZE*BINGO_SIZE}`;
        });

        let label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = phrase;

        let div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);

        content.appendChild(div);
    });

    submit.onclick = function () {
        let checked = content.querySelectorAll('input:checked');
        let selectedIndexes = Array.from(checked).map((checkbox) => Number(checkbox.id.split('-')[3]));
        

        //console.log(selectedIndexes);
        console.log(selectedIndexes);

        createComment("putin_bingo",0,document.getElementById("userComment").value,selectedIndexes)

        updateCommentsDiv("putin_bingo");

        overlay.style.display = 'none';
        overlay.style.opacity = '0';
    };

    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    content.style.top = `${window.scrollY}px`;
}


function showOverlay(table_id) {



    let all_words = JSON.parse(localStorage.getItem("MBPbingoData"))["putin_bingo"].start_words;



    words = [];
    
    let bd = JSON.parse(localStorage.getItem("MBPcommentsData"))["putin_bingo"][table_id].bingo_data;

    for (let i=0;i<bd.length;i++)
        words.unshift(all_words[bd[i]]);




    
    


    
    const overlay = document.getElementById('bingo-table-overlay');

    // Get the table
    const table = document.getElementById('bingo-table-big');

    // Clean the table
    table.innerHTML = '';

    let k = 0;

    // Generate cells
    let row;
    words.forEach((word, index) => {

        // Create new row every BINGO_SIZE cells (adjust this as needed)
        if (index % BINGO_SIZE === 0) {
            row = table.insertRow(-1); 
        }


        let cell = row.insertCell(-1);
        cell.id = `bingo_big_${table_id}_${k}`;
        cell.textContent = word;


        //const longestWordLength = Math.max(...word.split(' ').map(w => w.length));
        //cell.style.fontSize = Math.max(20 - (longestWordLength * 2),10)  + "px";  // adjust the multiplier as needed
        
        


        //cell.style.backgroundColor = "#ffaaff"
        // Increment k
        k++;
    });

     

    // Set the style to block to show the overlay
    overlay.style.opacity = '0';
    overlay.style.display = 'flex';
    
    // Fade in
    setTimeout(() => overlay.style.opacity = '1', 50);

    updateBingoColors("putin_bingo")
}

function updateBingoColors(articleId)
{

    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"))



    
    let comments = JSON.parse(localStorage.getItem("MBPcommentsData"))[articleId];

    let commentId = 0;

    comments.forEach(function(comment) {
        if (comment.bingo_data !== undefined)
        {
            

            for (let i=0;i<BINGO_SIZE*BINGO_SIZE;i++)
            {
                let col = null;

                if (bingoData[articleId].words_selected == null)
                    col = "#f0f0cc"
                else
                    col = (bingoData[articleId].words_selected[comment.bingo_data[i]]) ? "#32CD32" : "#DCDCDC";

                let cell= document.getElementById(`bingo_small_${commentId}_${i}`)

                cell.style.backgroundColor = col;

                cell = document.getElementById(`bingo_big_${commentId}_${i}`)

                if (cell)
                    cell.style.backgroundColor = col;

            }
        }
        commentId += 1;
    })

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
            
                


            let t = createTable(BINGO_SIZE, BINGO_SIZE,commentId);
            commentText.appendChild(t);
        }




        // Add the comment div to the comments container
        comments.appendChild(commentDiv);

        commentId += 1;
    });
}



function updateUserDiv()
{

    let userId = localStorage.getItem("MBPcurrentUser");

    
    let usersData = JSON.parse(localStorage.getItem("MBPusersData"));
    document.querySelector('#account-name').innerHTML = usersData[userId].name;
    document.querySelector('#score-number').innerHTML = usersData[userId].score.toFixed(1);
}

