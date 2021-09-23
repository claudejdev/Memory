// memory game, Claude J, 230921, rev 0.1
const divPlayground = document.querySelector("#playground");
//divPlayground.innerHTML = "<| Hello World |>";


//the 16 tiles in 4 rows of 4 columns
let gridTiles = new Array(
    [0,0,4,8],
    [0,1,5,9],
    [0,2,6,10],
    [0,3,7,0]
);
showTiles(); //cf. hoisting https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#function_declaration_hoisting


function showTiles() {
//?the image displayed depends of the value of the array's element at [i][j] :
//? if it's 0, then a button is displayed
//? otherwise, an image is selected. Cf. function getImage

    let txt = '';
    //1st loop which iterates in the 1st dimension of this array
    for (let i = 0; i < gridTiles.length; i++) {
        txt += '<div>';
        //2nd loop that  iterates in the 2nd dimension of the array
        for (let j = 0; j < gridTiles[i].length; j++) { 
            gridTiles[i][j] === 0?
            txt +='<button type="button" class="btn btn-primary m-2" style="width:100px;height:100px">Show</button>'
            :
            txt += "<img src='"+getImage(gridTiles[i][j])+"' style='width:100px;height:100px' class='m-2'>";
            //TODO: proper CSS file
            
        }
        txt += '</div>';
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
// Images from : https://www.kenney.nl/
