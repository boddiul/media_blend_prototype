


function createTable(articleId,W, H,id) {
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

    table.addEventListener("click",function() {showOverlay(articleId,id)})

    // Append the table to the body (or to any other container)
    return table;
}



function showNewBingoOverlay(articleId) {


    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"));
    


    phrases = bingoData[articleId].start_words
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

        createComment(articleId,0,document.getElementById("userComment").value,selectedIndexes)
        document.getElementById("userComment").value = "";
        updateCommentsDiv(articleId);

        overlay.style.display = 'none';
        overlay.style.opacity = '0';
    };

    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    content.style.top = `${window.scrollY}px`;
}


function showOverlay(articleId,table_id) {



    let all_words = JSON.parse(localStorage.getItem("MBPbingoData"))[articleId].start_words;



    words = [];
    
    let bd = JSON.parse(localStorage.getItem("MBPcommentsData"))[articleId][table_id].bingo_data;

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

    updateBingoColors(articleId)
}

let bingosS = 0;

function calculateBingos(matrix) {
    const n = matrix.length;
    let bingoCount = 0;

    // Checking rows
    for(let i = 0; i < n; i++) {
        if(matrix[i].every(val => val === true)) {
            bingoCount++;
        }
    }

    // Checking columns
    for(let i = 0; i < n; i++) {
        let columnBingo = true;
        for(let j = 0; j < n; j++) {
            if(matrix[j][i] !== true) {
                columnBingo = false;
                break;
            }
        }
        if(columnBingo) {
            bingoCount++;
        }
    }

    // Checking diagonals
    let diag1Bingo = true;
    let diag2Bingo = true;
    for(let i = 0; i < n; i++) {
        if(matrix[i][i] !== true) {
            diag1Bingo = false;
        }
        if(matrix[i][n-i-1] !== true) {
            diag2Bingo = false;
        }
    }
    if(diag1Bingo) {
        bingoCount++;
    }
    if(diag2Bingo) {
        bingoCount++;
    }

    return bingoCount;
}


function updateBingoColors(articleId)
{

    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"))



    
    let comments = JSON.parse(localStorage.getItem("MBPcommentsData"))[articleId];

    let commentId = 0;


    comments.forEach(function(comment) {
        if (comment.bingo_data !== undefined)
        {
            let ar = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

            let xx = 0;
            let yy = 0;

            for (let i=0;i<BINGO_SIZE*BINGO_SIZE;i++)
            {
                if (xx>=BINGO_SIZE)
                    {
                        xx = 0;
                        yy += 1;
                    }
                let col = null;

                if (bingoData[articleId].words_selected == null)
                    col = "#f0f0cc"
                else
                    col = (bingoData[articleId].words_selected[comment.bingo_data[i]]) ? "#32CD32" : "#DCDCDC";

                if (bingoData[articleId].words_selected != null)
                    ar[yy][xx] = (bingoData[articleId].words_selected[comment.bingo_data[i]])
                    
                    
                let cell= document.getElementById(`bingo_small_${commentId}_${i}`)

                cell.style.backgroundColor = col;

                cell = document.getElementById(`bingo_big_${commentId}_${i}`)

                if (cell)
                    cell.style.backgroundColor = col;

                    xx +=1;
            }

            if (comment.user_id==0 && bingoData[articleId].words_selected != null)
            {


                console.log(ar)
                let ssum = calculateBingos(ar)

                console.log(ssum)

                if (ssum != bingosS)
                {
                    bingosS = ssum
                    showScoreInc("BINGO!",100)
                }
            }
        }
        commentId += 1;
    })

}

function initBingoPage(articleId)
{
    


    updateArticleDiv(articleId);
    updateCommentsDiv(articleId);
    
    
    console.log(JSON.parse(localStorage.getItem("MBPbingoData")))
    console.log(JSON.parse(localStorage.getItem("MBPcommentsData")))
    
    
    document.getElementById('submitButton').addEventListener('click',
    
    function() {
        clickSubmitComment(articleId)
        }
        );
    
    document.getElementById('bingoButton').addEventListener('click', 
    
    function() {
        showNewBingoOverlay(articleId)
        }
        );
    
    
    document.getElementById('bingo-table-overlay').addEventListener('click', () => {
        // Fade out
        const overlay = document.getElementById('bingo-table-overlay');
        overlay.style.opacity = '0';
        
        setTimeout(() => overlay.style.display = 'none', 500);
    });
    
    
    let lastTimestamp = 0;
    
    function draw() {

        
        updateUserDiv()

        const currentTimestamp = Date.now();
    
        // Check if one second has passed since the last draw call
        if (currentTimestamp - lastTimestamp >= 1000) {
            lastTimestamp = currentTimestamp;
    
            // Drawing code here...
            console.log('Drawing...'); // replace this with your actual drawing code
    
            //updateCommentsDiv("putin_bingo");
    
    
            updateBingoColors(articleId);
    
        }
    

        requestAnimationFrame(draw);
    }
    
    requestAnimationFrame(draw);
}


