// memory game, Claude J, 230921, rev 0.1 MVP
const divPlayground = document.querySelector("#playground");
//divPlayground.innerHTML = "<| Hello World |>";


//the 16 tiles in 4 rows of 4 columns
let tiles = new Array(
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
);

// let results = new Array(
//     [1,6,5,4],
//     [8,2,3,8],
//     [7,3,2,7],
//     [4,6,5,1]
//
let results = randomArrayGenerator();


let previousClick = [];
let clickCounter = 0;
let ready = true;

showTiles(); //cf. hoisting https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#function_declaration_hoisting


function showTiles() {
//?the image displayed match the value of the array's element at [i][j] :
//? if it's 0, then a button is displayed
//? otherwise, an image is selected. Cf. function getImage

    let txt = "";
    //1st loop which iterates in the 1st dimension of this array
    for (let i = 0; i < tiles.length; i++) {
        txt += "<div>";
        //2nd loop that  iterates in the 2nd dimension of the array
        for (let j = 0; j < tiles[i].length; j++) { 
            tiles[i][j] === 0?
            txt +="<button class='btn btn-primary m-2 ' style='width:6.25rem;height:6.25rem' onClick='check(\""+i+"-"+j+"\")'><i class='bi bi-eye-fill'></i></button>"
            :
            txt += "<img src='"+getImage(tiles[i][j])+"' style='width:6.25rem;height:6.25rem' class='m-2'>";
            //TODO: proper CSS file
            
        }
        txt += "</div>";
    }
    divPlayground.innerHTML = txt;
}

function getImage(key) {
    //? the value of the array's element at [i][j] is used to select an image
    let imgPath ="./assets/images/";
    switch (key) {
        case 1: imgPath += 'elephant.png';          
        break;

        case 2: imgPath += 'giraffe.png';            
        break;

        case 3: imgPath += 'hippo.png';            
        break;

        case 4: imgPath += 'monkey.png';            
        break;

        case 5: imgPath += 'panda.png';           
        break;

        case 6: imgPath += 'parrot.png';
        break;

        case 7: imgPath += 'penguin.png';            
        break;

        case 8: imgPath += 'pig.png';            
        break;

        case 9: imgPath += 'rabbit.png';            
        break;

        case 10: imgPath += 'snake.png';            
        break;

        default: console.log("Who let the dogs out ?");
        break;
    }
    return imgPath;
}
//receive the coordinates of the clicked button
function check(clicked) {
    if (ready) {
        clickCounter++; //increment click's counter
        //!substr !== substring https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
        let line = clicked.substr(0,1);
        let column = clicked.substr(2,1);
        // console.log(line);    
        // console.log(column);  
        //assign the coordinates from the results array to the tiles one. 
        tiles[line][column] = results[line][column];
        //then show the tile again by executing the function
        showTiles();
    
        //check how many clicks, if two then , 
        if (clickCounter>1) {
            ready = false;
            //Delay to let the user see the second image
            setTimeout(() => {
                //if the previously clicked doesn't match with the the last click, prepare the button
                if (tiles[line][column] !== results[previousClick[0]][previousClick[1]]) {
                    tiles[line][column] = 0;
                    tiles[previousClick[0]][previousClick[1]] = 0;
                }
                //then show the tile again
                showTiles();
                ready = true;
                //and thus reset the counter to 0
                clickCounter = 0;
                //we need to know which tile was clicked, then compare 
                previousClick = [line,column];
            },1000)
        } else {
            //we need to know which tile was clicked, then compare 
            previousClick = [line,column];
        }

    }

}
// random results array

function randomArrayGenerator (){
    let rndArray = new Array();

    let imageIndexes = new Array(0,0,0,0,0,0,0,0); 
    //Generate a 16 cells table
    for (let i = 0; i < 4; i++) {
        let line = new Array();
        for (let j = 0; j < 4; j++) {
            let found = false;//found a match in imageIndexes
            while ((!found)) {
                let rndImage = Math.floor(Math.random() * 8);
                if (imageIndexes[rndImage] < 2) {
                    line.push(rndImage+1);
                    imageIndexes[rndImage]++;
                    found = true;                
                }
            }

        }
        rndArray.push(line);
    }
    return rndArray;
}