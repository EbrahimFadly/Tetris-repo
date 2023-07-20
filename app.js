    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const dscore = document.querySelector('#sh')
    const sbutton = document.querySelector('#start')
    const rbutton = document.getElementById('reset')
    const width = 10
    let timer = null
    let score = 0
    // let speed = 1000
//shapes   
    const Lshape = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    const Zshape = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const Tshape = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const Oshape = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const Ishape = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]


    const Shapes = [Lshape, Zshape, Tshape, Oshape, Ishape]
    let currentPos = 4
    let rotation = 0
    let random = Math.floor(Math.random()*Shapes.length)
    let current = Shapes[random][rotation]
    function draw() {
        current.forEach(Element => {
          squares[currentPos + Element].classList.add('shape')
          if (random === 0) {
            squares[currentPos + Element].classList.add('red')
          }else if (random === 1) {
            squares[currentPos + Element].classList.add('orange')
          }else if (random === 2) {
            squares[currentPos + Element].classList.add('yellow')
          }else if (random === 3) {
            squares[currentPos + Element].classList.add('pink')
          }else if (random === 4) {
            squares[currentPos + Element].classList.add('green')
          }
        })
    }
    function undraw() {
        current.forEach(Element => {
            squares[currentPos + Element].classList.remove('shape')
            if (random === 0) {
                squares[currentPos + Element].classList.remove('red')
              }else if (random === 1) {
                squares[currentPos + Element].classList.remove('orange')
              }else if (random === 2) {
                squares[currentPos + Element].classList.remove('yellow')
              }else if (random === 3) {
                squares[currentPos + Element].classList.remove('pink')
              }else if (random === 4) {
                squares[currentPos + Element].classList.remove('green')
              }
          })
    }
    function control(event) {
        if (!timer) {
            return
        }
        if (event.keyCode === 37) {
            moveLeft()
        }
        else if (event.keyCode === 39) {
            moveRight()
        }
        else if (event.keyCode === 38) {
            rotate()
        }
        else if (event.keyCode === 40) {
            goDown()   
        }
    }
    function defaultFall() {
        undraw()
        currentPos += width
        draw()
        set()
    }
    function set() {
        if (current.some(Element => squares[currentPos + Element + width].classList.contains('Taken'))) {
            current.forEach(element => squares[currentPos + element].classList.add('Taken'))
            random = Math.floor(Math.random()*5)
            current = Shapes[random][rotation]
            currentPos = 4
            rotation = 0
            highlight()
            addscore()
            // addspeed()
            gameOver()
            draw()

        }
    }
    function moveLeft() {
        undraw()
        const atleftEdge = current.some(element => (currentPos + element) % width === 0 )
        if (!atleftEdge) {
            currentPos -= 1 
        }
        if (current.some(element => squares[currentPos + element].classList.contains('Taken'))) {
            currentPos += 1
        }
        draw()
    }
    function moveRight() {
        undraw()
        const atRightEdge = current.some(element => (currentPos + element) % width === width -1)
        if (!atRightEdge) {
            currentPos += 1
        }
        if (current.some(element => squares[currentPos + element].classList.contains('Taken'))) {
            currentPos -= 1
        }
        draw()
    }
    function rotate() {
        undraw()
        rotation++
        if (rotation === current.length) {
            rotation = 0    
        }
        current = Shapes[random][rotation]
        draw()
    }
    function goDown() {
        defaultFall()
    }
    function startNpause() {
        if (timer) {
            clearInterval(timer)
            timer = null
        }else{
            draw()
            timer = setInterval(defaultFall, 1000)
        }
    }
    function addscore() {
        for (let i = 0; i < 199; i+=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if (row.every(element => squares[element].classList.contains('Taken'))) {
                score += 1
                dscore.innerHTML = "Score : " + score
                row.forEach(element => {
                    squares[element].classList.remove('Taken')
                    squares[element].classList.remove('shape')
                    squares[element].classList.remove('highlighted')
                    squares[element].classList.remove('red')
                    squares[element].classList.remove('orange')
                    squares[element].classList.remove('yellow')
                    squares[element].classList.remove('pink')
                    squares[element].classList.remove('green')
                })
                const deletedsquares = squares.splice(i, 10)
                squares = deletedsquares.concat(squares)
                squares.forEach(element => grid.appendChild(element))
            } 
        }
    }
    function gameOver() {
        if (current.some(element => squares[currentPos + element].classList.contains('Taken'))) {
            dscore.innerHTML =  "Game over"
            clearInterval(timer)
            document.removeEventListener("keyup", control)
        }
    }
    function highlight() {
        for (let i = 0; i < 199; i+=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            row.forEach(element => {
                if (squares[element].classList.contains('Taken')) {
                    squares[element].classList.add('highlighted')
                }
            })
        }
    }
    function restart(event) {
        if (event.keyCode === 82) {
            rbutton.click()
        }
    }
    function pause(event) {
        if (event.keyCode === 83) {
            startNpause()
        }
    }
    /*function addspeed() {
        if (score === 0) {
            speed += 10000
        }
    }*/
    document.addEventListener('keyup', pause)
    document.addEventListener('keyup', restart)
    document.addEventListener('keyup', control)
    sbutton.addEventListener('click',startNpause)


