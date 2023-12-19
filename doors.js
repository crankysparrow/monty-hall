let instText = {
    youChose: (ind) => `<p>You chose <strong>door ${ind + 1}</strong>...</p>`,
    opponentReveals: (ind) =>
        `<p>Your opponent opens <strong>door ${
            ind + 1
        }</strong> to reveal a <strong>goat</strong></p>`,
    switchQuestion: (ind) => `<p>Do you want to switch to <strong>door ${ind + 1}</strong>?</p>`,
    switchYes: (ind) => `<p>You switched to <strong>door ${ind + 1}</strong>...</p>`,
    switchNo: (ind) => `<p>You kept <strong>door ${ind + 1}</strong>...</p>`,
    revealCar: () => `<p>and you win a <strong>car</strong>!</p>`,
    revealGoat: () => `<p>and you win a <strong>goat</strong>! no car for you :(</p>`,
}
let instructions = document.querySelector('.instructions')
let switches = document.querySelector('.switch')
let switchReveal = document.querySelector('.switch-reveal')

let behindDoors = ['goat', 'goat', 'goat']
let indexCar = Math.floor(Math.random() * 3)
behindDoors[indexCar] = 'car'

let doors = document.querySelectorAll('.door')
let indChoice = -1
let indRev = -1

let goat = document.createElement('div')
let car = document.createElement('div')
goat.classList.add('behind')
goat.classList.add('door-reveal-loss')
car.classList.add('behind')
car.classList.add('door-reveal-win')
// goat.innerHTML = 'GOAT'
// car.innerHTML = 'CAR'

for (let i = 0; i < 3; i++) {
    let behind = behindDoors[i]
    if (behind === 'car') {
        doors[i].appendChild(car.cloneNode(true))
    } else {
        doors[i].appendChild(goat.cloneNode(true))
    }

    doors[i].addEventListener('click', function () {
        if (indChoice === -1) {
            indChoice = i
            doors[i].classList.add('chosen')
            instructions.innerHTML = instText.youChose(i)
            setTimeout(revealDoor, 500)
        }
    })
}

function revealDoor() {
    indRev = behindDoors.findIndex((item, i) => item !== 'car' && i !== indChoice)
    doors[indRev].classList.add('revealed')

    instructions.innerHTML = instructions.innerHTML + instText.opponentReveals(indRev)

    setTimeout(() => {
        instructions.innerHTML =
            instructions.innerHTML + instText.switchQuestion(3 - indChoice - indRev)

        switches.classList.add('show')
    }, 500)
}

let btnYes = document.getElementById('switch-yes')
let btnNo = document.getElementById('switch-no')
let btnReveal = document.getElementById('switch-reveal')

btnYes.addEventListener('click', function () {
    let newChoice = 3 - indChoice - indRev
    console.log({ newChoice, indChoice, indRev })
    doors[indChoice].classList.remove('chosen')
    indChoice = newChoice
    doors[indChoice].classList.add('chosen')

    switches.classList.remove('show')
    instructions.innerHTML = instructions.innerHTML + instText.switchYes(newChoice)
    switchReveal.classList.add('show')
})

btnNo.addEventListener('click', function () {
    switches.classList.remove('show')
    instructions.innerHTML = instructions.innerHTML + instText.switchNo(indChoice)

    switchReveal.classList.add('show')
})

btnReveal.addEventListener('click', function () {
    doors[indChoice].classList.add('revealed')
    if (behindDoors[indChoice] === 'car') {
        instructions.innerHTML = instructions.innerHTML + instText.revealCar()
    } else {
        instructions.innerHTML = instructions.innerHTML + instText.revealGoat()
    }
    switchReveal.classList.remove('show')
})
