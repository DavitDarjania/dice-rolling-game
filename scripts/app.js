const menuButton = document.querySelector('.menu-button')
const menuSound = document.querySelector('#menu_click')
const menuModal = document.querySelector('.menu-modal')
const menuAfter = document.querySelector('.game-section-after')
const menuSoundHeader = document.querySelector('.sound_header')

const regulateContinue = document.querySelector('#continue_game')
const regulateRestart = document.querySelector('#restart_game')
const regulateSound = document.querySelector('.sound-on-off')

const diceOne = document.createElement('img')
const diceTwo = document.createElement('img')
const diceThree = document.createElement('img')
const diceFour = document.createElement('img')
const diceFive = document.createElement('img')
const diceSix = document.createElement('img')

const clickSound = document.querySelector('#play_click')
const rollingSound = document.querySelector('#rolling_sound')
const winSound = document.querySelector('#win_sound')
const loseSound = document.querySelector('#lose_sound')
loseSound.volume = 0.3
const mouseClick = document.querySelector('#mouse_click')


const playButton = document.querySelector('.play_text')
const myDice = document.querySelector('.my-dice-main-box')
const computerDice = document.querySelector('.computer-dice-main-box')

diceOne.src = "./images/dice.png"
diceTwo.src = "./images/dice-2.png"
diceThree.src = "./images/dice-3.png"
diceFour.src = "./images/dice-4.png"
diceFive.src = "./images/dice-5.png"
diceSix.src = "./images/dice-6.png"

const myPointCounter = document.querySelector('#myCounter')
const CompPointCounter = document.querySelector('#computerCounter')

const announcmentText = document.querySelector('.announcment_text')

menuButton.addEventListener('click', () => {
    menuSound.currentTime = 0
    menuSound.play()
    menuModal.classList.add('d-block')
    menuAfter.classList.add('show-after')
})

regulateContinue.addEventListener('click', () => {
    mouseClick.currentTime = 0
    mouseClick.play()
    menuAfter.classList.remove('show-after')
    menuModal.classList.remove('d-block')
})

regulateRestart.addEventListener('click', () =>{
    mouseClick.currentTime = 0
    mouseClick.play()
    mouseClick.addEventListener('ended', () => {
        window.location.href = 'index.html';
    })
})

regulateSound.addEventListener('click', () => {
    mouseClick.currentTime = 0
    mouseClick.play()
    if(regulateSound.classList.contains('active')){
        regulateSound.classList.remove('active')
        winSound.volume = 0
        loseSound.volume = 0
        menuSound.volume = 0
        clickSound.volume = 0
        rollingSound.volume = 0
        mouseClick.volume = 0
        regulateSound.src = "./images/mute.png"
        menuSoundHeader.textContent = 'SOUND OFF'
    }
    else{
        regulateSound.classList.add('active')
        winSound.volume = 1
        loseSound.volume = 0.3
        menuSound.volume = 1
        clickSound.volume = 1
        rollingSound.volume = 1
        mouseClick.volume = 1
        regulateSound.src = "./images/volume.png"
        menuSoundHeader.textContent = 'SOUND ON'
    }
})

let diceArray = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix]
playButton.addEventListener('click', async () =>{
    clickSound.currentTime = 0
    clickSound.play()
    let myDiceResult = await rollDice(myDice)
    let CompDiceResult = await rollDice(computerDice)
    let winningResult = whoWon(myDiceResult, CompDiceResult)
    console.log(winningResult)
    winnerPoint(winningResult)
    announce(winningResult)
    
})

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function rollDice(element){
    let currentImg;
    rollingSound.currentTime = 0
    rollingSound.play()
    for(let i = 0; i < 15; i++){
        currentImg = element.querySelector('img')

        let indexofsrc = Math.floor(Math.random() * 6)
        currentImg.src = diceArray[indexofsrc].src
        await sleep(100)
    }
    return currentImg
}

function whoWon(myDice, CompDice){
    let diceUrlArr = ['http://127.0.0.1:5500/images/dice.png', 'http://127.0.0.1:5500/images/dice-2.png', 'http://127.0.0.1:5500/images/dice-3.png', 'http://127.0.0.1:5500/images/dice-4.png', 'http://127.0.0.1:5500/images/dice-5.png', 'http://127.0.0.1:5500/images/dice-6.png']
    if((diceUrlArr.indexOf(myDice.src) + 1) > diceUrlArr.indexOf(CompDice.src) + 1){
        winSound.currentTime = 0
        winSound.play()
        return "You Won!"
    }
    else if((diceUrlArr.indexOf(myDice.src) + 1) < diceUrlArr.indexOf(CompDice.src) + 1){
        loseSound.currentTime = 0
        loseSound.play()
        return "Computer Won!"
    }
    else{
        return "It's a Tie!"
    }
}

function winnerPoint(string){
    if(string == "You Won!"){
        myPointCounter.textContent = (Number(myPointCounter.textContent) + 1)
    }
    else if(string == "Computer Won!"){
        CompPointCounter.textContent = (Number(CompPointCounter.textContent) + 1)
    }
    else{
        return
    }
}

async function announce(text) {
    announcmentText.textContent = ''
    await sleep(100)
    announcmentText.textContent = text
}
