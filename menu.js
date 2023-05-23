
function generateName() {
    const names = ['John', 'Jane', 'Mike', 'Emily', 'Harry', 'Emma', 'James', 'Sophia'];
    const surnames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Miller', 'Davis', 'Anderson', 'Thomas'];
    const words = ['Lion', 'Tiger', 'Eagle', 'Shark', 'Fox', 'Wolf', 'Bear', 'Hawk'];
  
    let name1 = names[Math.floor(Math.random() * names.length)];
  
    let allSecondWords = [...surnames, ...words];
    let name2;
    do {
      name2 = allSecondWords[Math.floor(Math.random() * allSecondWords.length)];
    } while (name1 === name2);
  

    let randNum = Math.floor(Math.random() * 100) + 1;

    if (Math.random()<0.5)
        randNum = ""
    let delim = "_";
    
    if (Math.random()<0.5)
        delim = " "
  
    return `${name1}${delim}${name2}${randNum}`;
  }



function initDB() {
    
    console.log("db init")
    let usersData = {
    }

    let N = 15;
    for (let i = 0; i <= N; i++) {
        let randomName = generateName();
        let randomScore = 100+Math.floor(Math.random() * 900); 
        let randomAvatarId = i%9;//Math.floor(Math.random() * 11);
    
        usersData[i] = {
          id: i.toString(),
          name: randomName,
          score: randomScore,
          avatar_id: randomAvatarId
        };
      }
    

    console.log(usersData)


    localStorage.setItem("MBPusersData", JSON.stringify(usersData));
    localStorage.setItem("MBPcurrentUser","0")


    updateUsersRanks();






    let articlesData = {
        "putin_bingo" : {
            id : "putin_bingo",
            title : "Putin's Direct Line Today: Join the Putin-Bingo Challenge!",
            text : 
            `As the annual tradition continues, President Vladimir Putin is once again set to hold his Direct Line event today, an interactive broadcast where he fields questions from both the public and journalists. This multi-hour Q&A session has been a long-standing platform for Putin to address national and global issues, with this year expected to carry forward this tradition amidst the changing international geopolitical landscape.
            
            The Direct Line event gives citizens a unique chance to directly question the Russian leader, revealing his thoughts and strategies on a wide array of topics. Today's session is expected to focus on a number of pressing subjects, from domestic concerns such as economy and healthcare, to international relations and Russia's role on the global stage.
            
            We invite our readers to participate in our interactive Putin-Bingo. Choose quotes and themes that you think President Putin will touch upon during the Direct Line event. We've compiled a list of 50 words and phrases that Putin often uses – the aim of the game is to predict which of these will make an appearance. As the event unfolds, we will highlight the words and phrases spoken by Putin. Once the event concludes, we'll tally up the scores and see who was able to accurately predict Putin's talking points. The more lines you guess correctly, the higher your score! So tune in, participate, and make this political event a fun and insightful experience.
            `,
            image : "putin_bingo.jpg",
            date : "21.12.23"
        }
    }

    

    localStorage.setItem("MBParticlesData", JSON.stringify(articlesData));


    let commentsData = {
        "putin_bingo" : [
            {

                user_id : "4",
                text : `Direct Line again? Can't wait to hear the same promises recycled. My bingo card is filled with economic improvement promises that never materialize.`,
                bingo_data : null,
            },
            {
                user_id : "5",
                text : `I can't believe this is still a thing. Anyway, my bingo card is filled with "National Unity", "Strategic partnership", and "Eurasian integration". Who wants to place bets?`,
                
            },
            {
                user_id : "6",
                text : `Another Direct Line, another chance for political theater. My Putin-bingo pick: "Strong Russia", "Sovereign internet", "Traditional values". What's yours?`,
                bingo_data : null,
            },
            {
                user_id : "7",
                text : `Looking forward to hearing President Putin address our concerns. He always has insightful things to say. My bingo card has "progress", "development", and "Russia’s future".`,
                bingo_data : null,
            },
            {
                user_id : "8",
                text : `This year's bingo should have an option for "unanswered questions". I would win for sure!`
            },
            {
                user_id : "9",
                text : `Just once, I would like the Direct Line to provide real solutions rather than deflections. My bingo card? "Western aggression", "Sanctions", and "Patriotism". Easy wins.`,
                bingo_data : null,
            },
            {
                user_id : "10",
                text : `I have chosen all the buzzwords associated with foreign policy. I bet Putin is going to give us another lecture on international relations and Russia's unique role.`,
                bingo_data : null,
            }
        ]
    }

    for (let i=0;i<commentsData["putin_bingo"].length;i++)
    {
        if (commentsData["putin_bingo"][i].bingo_data !== undefined)
        {
            let M = 50 - 21;
            let N = BINGO_SIZE*BINGO_SIZE;

            let array = Array.from({length: M}, (_, i) => i);

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            commentsData["putin_bingo"][i].bingo_data = array.slice(0, N);


        }
    }


    localStorage.setItem("MBPcommentsData", JSON.stringify(commentsData));


    let bingoData = {
        "putin_bingo": {
            start_words :
                    ["National security",
                    "International cooperation",
                    "United States",
                    "NATO",
                    "Strategic partnership",
                    "Economic development",
                    "Domestic affairs",
                    "Constitutional reforms",
                    "Anti-corruption",
                    "Modernization",
                    "Eurasian Union",
                    "Democracy",
                    "Western sanctions",
                    "Global stability",
                    "Crimea",
                    "Syrian conflict",
                    "Arctic exploration",
                    "Oil and gas",
                    "Climate change",
                    "Military modernization",
                    "Education reform",
                    "Healthcare",
                    "BRICS nations",
                    "Cybersecurity",
                    /*"Digital economy",
                    "Traditional values",
                    "Foreign policy",
                    "Infrastructure",
                    "Terrorism",
                    "Russian Constitution",
                    "Human rights",
                    "Technological innovation",
                    "COVID-19 pandemic",
                    "Vaccination",
                    "Russian Orthodox Church",
                    "Russian space program",
                    "World Trade Organization",
                    "Chinese-Russian relations",
                    "Middle East",
                    "North Korea",
                    "Iran nuclear deal",
                    "Eurasian Economic Union",
                    "Pension reform",
                    "Social inequality",
                    "Disinformation",*/
                    "Multilateralism",
                    "European Union",
                    "Opposition parties",
                    "Artificial Intelligence",
                    "Information technology"],
            game_step : 0, 
            words_selected : null
        }
    }

    localStorage.setItem("MBPbingoData", JSON.stringify(bingoData));


    initBingoDiv();
    

    
}




function initBingoDiv() {


    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"))



    const phrasesArea = document.getElementById('phrasesArea');
    const checkboxArea = document.getElementById('checkboxArea');

    phrasesArea.value = bingoData["putin_bingo"].start_words.join('\n');

    if (bingoData["putin_bingo"].game_step === 0) {
        phrasesArea.style.display = 'block';
        checkboxArea.style.display = 'none';
    } else if (bingoData["putin_bingo"].game_step === 1) {
        phrasesArea.style.display = 'none';
        createCheckboxes(false,bingoData["putin_bingo"].words_selected);
    } else if (bingoData["putin_bingo"].game_step === 2) {
        phrasesArea.style.display = 'none';
        createCheckboxes(true,bingoData["putin_bingo"].words_selected);
    }

}

function createCheckboxes(disabled,selectedList) {

    
    
    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"));

    const checkboxArea = document.getElementById('checkboxArea');
    checkboxArea.innerHTML = '';

    bingoData["putin_bingo"].start_words.forEach((phrase, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox' + index;
        checkbox.onclick = function() {

            inversePhrase(index);
            
        };
        checkbox.disabled = disabled;

        checkbox.checked = selectedList[index];
        
        const label = document.createElement('label');
        label.htmlFor = 'checkbox' + index;
        label.appendChild(document.createTextNode(phrase));

        checkboxArea.appendChild(checkbox);
        checkboxArea.appendChild(label);
        checkboxArea.appendChild(document.createElement('br'));
    });

    checkboxArea.style.display = 'block';
}


function updatePhrases() {

    console.log("UPDATED")


    

    const phrasesArea = document.getElementById('phrasesArea');
    let phrases = phrasesArea.value.split('\n');


    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"));
    
    bingoData["putin_bingo"].start_words = phrases;

    localStorage.setItem("MBPbingoData", JSON.stringify(bingoData));

}

function inversePhrase(index) {
    
    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"));
    
    bingoData["putin_bingo"].words_selected[index] = !bingoData["putin_bingo"].words_selected[index]

    localStorage.setItem("MBPbingoData", JSON.stringify(bingoData));

}

function handleNext() {
    const phrasesArea = document.getElementById('phrasesArea');
    const checkboxArea = document.getElementById('checkboxArea');
    const nextButton = document.getElementById('nextButton');

    let bingoData = JSON.parse(localStorage.getItem("MBPbingoData"));
    

    

    if (bingoData["putin_bingo"].game_step === 0) {
        
        
        phrasesArea.style.display = 'none';

        bingoData["putin_bingo"].game_step = 1;
        bingoData["putin_bingo"].words_selected = new Array(bingoData["putin_bingo"].start_words.length).fill(false);


        createCheckboxes(false,bingoData["putin_bingo"].words_selected);



        } else if (bingoData["putin_bingo"].game_step === 1) {
            bingoData["putin_bingo"].game_step = 2;
            
            
            createCheckboxes(true,bingoData["putin_bingo"].words_selected);

        }
        
    localStorage.setItem("MBPbingoData", JSON.stringify(bingoData));

    }


function initMenuPage() 
{

    document.getElementById("phrasesArea").addEventListener("input",updatePhrases)
    document.getElementById("nextButton").addEventListener("click",handleNext)
    
    if (localStorage.getItem("MBPinit")===null)
    {
        initDB();
        localStorage.setItem("MBPinit",true)
    }

    initBingoDiv();
}