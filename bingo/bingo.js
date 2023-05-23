updateUserDiv()


updateArticleDiv("putin_bingo");
updateCommentsDiv("putin_bingo");


console.log(JSON.parse(localStorage.getItem("MBPbingoData")))
console.log(JSON.parse(localStorage.getItem("MBPcommentsData")))


document.getElementById('submitButton').addEventListener('click', clickSubmitComment);

document.getElementById('bingoButton').addEventListener('click', showNewBingoOverlay);


document.getElementById('bingo-table-overlay').addEventListener('click', () => {
    // Fade out
    const overlay = document.getElementById('bingo-table-overlay');
    overlay.style.opacity = '0';
    
    setTimeout(() => overlay.style.display = 'none', 500);
});


let lastTimestamp = 0;

function draw() {
    const currentTimestamp = Date.now();

    // Check if one second has passed since the last draw call
    if (currentTimestamp - lastTimestamp >= 1000) {
        lastTimestamp = currentTimestamp;

        // Drawing code here...
        console.log('Drawing...'); // replace this with your actual drawing code

        //updateCommentsDiv("putin_bingo");


        updateBingoColors("putin_bingo");

    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);