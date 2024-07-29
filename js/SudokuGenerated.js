class Sudoku {

    constructor() {
        this.digits = this.blankMatrix(9);
    }

    blankMatrix(size) {
        let newMatrix = [];
        for (let i = 0;i < size;i ++) {
            newMatrix.push([]);
        }
        return newMatrix;
    }

    makeDigits() {
        let colLists = this.blankMatrix(9);
        let areaLists = this.blankMatrix(3);
        let nine = this.randNine();
        let i = 0,
            j = 0,
            areaIndex = 0,
            count = 0,
            error = false,
            first = 0;
        for (i = 0;i < 9;i ++) {
            colLists[i].push(nine[i]);
        }
        areaLists[0] = nine.slice(0, 3);
        areaLists[1] = nine.slice(3, 6);
        areaLists[2] = nine.slice(6);

        for (i = 0;i < 8;i ++) {
            nine = this.randNine();
            if (i % 3 == 2) {
                areaLists = this.blankMatrix(3);
            }

            for (j = 0;j < 9;j ++) {
                areaIndex = Math.floor(j / 3);
                count = 0;
                error = false;
                while (colLists[j].includes(nine[0]) || areaLists[areaIndex].includes(nine[0])) {
                    if (++count >= nine.length) {
                        error = true;
                        break;
                    }
                    nine.push(nine.shift());
                }
                if (error) return false;
                first = nine.shift();
                colLists[j].push(first);
                areaLists[areaIndex].push(first);
            }
        }
        this.digits = colLists;
        return true;
    }

    randNine() {
        const nine = this.nine();
        let index = 0;

        for (let i = 0;i < 5;i ++) {
            index = this.randIndex();
            [nine[0], nine[index]] = [nine[index], nine[0]];
        }

        return nine;
    }

    nine() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    randIndex() {
        return Math.floor(Math.random() * 9);
    }
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}



const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");

var AllSudoku = new Sudoku();
while (! AllSudoku.makeDigits());
window.sudoku = AllSudoku;

function transToSudoku(AllSudoku){
    console.log(AllSudoku);
    var Grid = []
    for (let i = 0; i < 9; i++) {
        Grid[i] = AllSudoku.digits[i].slice();
    }
    let count = 0;
    let st1 = 0;
    let st2 = 0;
    for(let k= 0; k < 9 ; k ++){
        for (let i = st1; i < st1 + 3; i++) {
            for (let j = st2; j < st2 + 3; j++) {
                Grid[k][count++] = AllSudoku.digits[i][j];
            }
        }
        st2 += 3;
        if(st2 > 8){
            st2 = 0;
            st1 += 3;
        }
        count = 0;
    }
    return Grid
}

var TrueMatrix = transToSudoku(window.sudoku);

btn1.addEventListener("click",function() {
    let hard = prompt("请输入数独的难度：","20")
    for (let i = 1; i <= 9; i ++) {
        for(let j = 1; j <= 9; j ++) {
            let block = `.part${i} .block${j}`
            let dom = document.querySelector(block)
            dom.innerText = TrueMatrix[i-1][j-1];
            dom.style.color="black";
            dom.style.fontWeight="normal";
        }
    }
    let basic = 20;
    basic += hard * 4
    for(let i = 0;i < basic;i++){
        let row = getRandomInt(10);
        let col = getRandomInt(10);
        let block = `.part${row} .block${col}`
        let spaceBlock = document.querySelector(block)
        if (spaceBlock) {
            spaceBlock.innerText = '';
        }
    }
})


btn2.addEventListener("click", function() {
    for (let i = 1; i <= 9; i ++) {
        for(let j = 1; j <= 9; j ++) {
            let block = `.part${i} .block${j}`
            let dom = document.querySelector(block)
            dom.innerText = TrueMatrix[i-1][j-1];
        }
    }
    console.log(TrueMatrix)
})

let subBlock = document.querySelector("#SudokuMain")
subBlock.addEventListener("click", function(e) {
    let row = e.target.parentNode.getAttribute("class")
    let col = e.target.getAttribute('class')
    let input = prompt("请输入要输入的数字")
    let block = `.part${row[row.length-1]} .block${col[col.length-1]}`
    let output = document.querySelector(block)
    output.innerText = input;
    output.style.color="orange";
    output.style.fontWeight = "bold";

    let count = 0;
    for (let i = 1; i <= 9; i ++) {
        for(let j = 1; j <= 9; j ++) {
            let block = `.part${i} .block${j}`
            let dom = document.querySelector(block)
            if(dom.innerText[0] == TrueMatrix[i-1][j-1]){
                count++;
            }
        }
    }
    console.log(count);
    if(count === 81){
        alert("完全正确喵！")
        window.location.reload();
    }
})

