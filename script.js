const questions = [
    {
        question: "Which tag is used to create a hyperlink?",
        optionA: "<a>",
        optionB: "<img>",
        optionC: "<dl>",
        optionD: "<link>",
        correctOption: "optionA"
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        optionA: "<js>",
        optionB: "<javascript>",
        optionC: "<script>",
        optionD: "<scripting>",
        correctOption: "optionC"
    },


    {
        question: "Which of the following tags is used to create an unordered list?",
        optionA: "ol",
        optionB: "li",
        optionC: "ul",
        optionD: "ulist",
        correctOption: "optionC"
    },

    {
        question: "What is the correct syntax for referring to an external script called 'hello.js?'",
        optionA: "<script src='hello.js'>",
        optionB: "<script name='hello.js'>",
        optionC: "<script href='hello.js'>",
        optionD: "script link='hello.js'>",
        correctOption: "optionA"
    },

    {
        question: "Which is the correct CSS syntax?",
        optionA: "{body:color= black;}",
        optionB: "{body;color: black;}",
        optionC: "body {color: black;}",
        optionD: "body:color=black;",
        correctOption: "optionC"
    },

    {
        question: "How do you create a function in JavaScript?",
        optionA: "function:myFunction()",
        optionB: "function myFunction()",
        optionC: "function = myFunction()",
        optionD: "function.myFunction()",
        correctOption: "optionB"
    },

    {
        question: "How do you insert a comment in a CSS file?",
        optionA: "// this is a comment",
        optionB: "' this is a comment '",
        optionC: "// this is a comment //",
        optionD: "/* this is a comment */",
        correctOption: "optionD"
    },

    {
        question: "What does HTML stand for?",
        optionA: "Hyper Markup Text Language",
        optionB: "Hyperlinks and Text Markup Language",
        optionC: "Home Tool Markup Language",
        optionD: "Hypertext Markup Language",
        correctOption: "optionD"
    },

    {
        question: "What is the correct HTML element for inserting a line break?",
        optionA: "<break>",
        optionB: "<lb>",
        optionC: "<br>",
        optionD: "<lineb>",
        correctOption: "optionC"
    },

    {
        question: "Which HTML attricute specifies an alternate text for an image, if the image cannot be displayed?",
        optionA: "src",
        optionB: "title",
        optionC: "alt",
        optionD: "longdesc",
        correctOption: "optionC"
    },

    {
        question: "How do you add a background color for all <h1> elements?",
        optionA: "h1.all{background-color:#FFFFFF;}",
        optionB: "all.h1{background-color:#FFFFFF;}",
        optionC: "h1{background-color:#FFFFFF;}",
        optionD: "{background-color:#FFFFFF;} h1",
        correctOption: "optionC"
    },

    {
        question: "Which CSS property controls the text size?",
        optionA: "text-size",
        optionB: "font-size",
        optionC: "text-style",
        optionD: "font-style",
        correctOption: "optionB"
    },

    {
        question: "What does CSS stand for?",
        optionA: "Creative Style Sheets",
        optionB: "Computer Style Sheets",
        optionC: "Colorful Style Sheets",
        optionD: "Cascading Style Sheets",
        correctOption: "optionD"
    },

    {
        question: "Which property is used to change the background color?",
        optionA: "background-color",
        optionB: "bgcolor",
        optionC: "color",
        optionD: "color-background",
        correctOption: "optionA"
    },

    {
        question: "How do you write an IF statement in JavaScript?",
        optionA: "if(i == 5)",
        optionB: "if i = 5 then",
        optionC: "if i = 5",
        optionD: "if i == 5 then",
        correctOption: "optionA"
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Review a little more and you'll get it in no time!."
        remarkColor = "black"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Good Job! Keep practicing!."
        remarkColor = "black"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "black"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}