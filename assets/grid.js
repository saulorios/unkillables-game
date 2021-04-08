const shipEnemies = []
let gameScore = 0

class Player{
    constructor(name, strength){
        this.name = name
        this.strength = strength
    }
    
    attack(x, y){  
        const attackTarget = shipEnemies.filter((elem) => {
            return elem.name === `${x},${y}`
        })[0]  
        if(attackTarget){
            attackTarget.receiveDamage(this.strength)
            if(attackTarget.health <= 0){
                let death = shipEnemies.indexOf(attackTarget)
                console.log(death)
                if(death > -1){
                    shipEnemies.splice(death, 1)
                }
            }
            console.log(attackTarget)
        }else{
            alert('Errou!')
        }
        
    }
}

class ShipEnemies{
    constructor(health, posX, posY) {
        this.health = health;
        this.posX = posX
        this.posY = posY
        this.name = `${posX},${posY}`;  
    }


    receiveDamage(amount){        
        
        this.health -= amount
        const ship = document.getElementById(this.name)
        // console.log(ship)
        ship.classList.add('death')        
        if(this.health > 0){     
            return `The enemy has received ${amount} points of damage`;
        }else {
            gameScore += 1
            let score = document.getElementById('score')
            if(gameScore >= 10){
                let result = confirm(`You win! Do you want to continue or stop?`)
                if(result == true){
                    alert("Nice!!")
                }else {
                    location.reload();
                }
            }
            score.innerHTML = `SCORE: ${gameScore}`
        }
    }
    

}


let coordinates = []

const addAttack = (ev) => {
    ev.preventDefault()
    let coordinate = {
        name: document.getElementById('name').value,
        positionX: document.getElementById('positionX').value,
        positionY: document.getElementById('positionY').value
    }
    coordinates.push(coordinate)
    document.querySelector('form').reset()
    let player = new Player(coordinate.name, 10)
    player.attack(coordinate.positionX, coordinate.positionY)
    
}

document.addEventListener('DOMContentLoaded', () => {
    const playerGrid = document.getElementById('quadrant')
    const playerSquares = []
    
    function createBoard(grid, squares) {
        for(let i = 0; i < 1600; i++){
            let x = Math.floor(Math.random() * 40)
            let y = Math.floor(Math.random() * 80)
            
            let attackTarget = new ShipEnemies(10, x, y)
            if(!shipEnemies.includes(attackTarget)){
                shipEnemies.push(attackTarget)
            }
        }
        console.log(shipEnemies)

        for(let i = 0; i < 40; i++){
            for(let j = 0; j < 80; j++){
                const square = document.createElement('div')
                square.id = `${i},${j}`
                grid.appendChild(square)
                squares.push(square)
            }         
        }
    }

    createBoard(playerGrid, playerSquares)
    
    document.getElementById('fire').addEventListener('click', addAttack);



})