
let hours = [];
let mins = [];
let seconds = [];
let cs = 0;
let counter = 0;
let theOneTrueDate = new Date(); // only 1 damn it
const HOUR_COLOR = "red";

function setMinsClear() {
    for (let i=0;i<mins.length;i++) {
        mins[i].color = "green";
    }
}
function setSecondsClear() {
    for(let i=0;i<seconds.length;i++) {
        seconds[i].color = "blue";
    }
}
function setHoursClear() {
    for (let i=0;i<hours.length;i++) {
        hours[i].color = HOUR_COLOR;
    }
}

function main() {

    let { init, Sprite, GameLoop } = kontra

    let { canvas } = init();

    for(let i=0;i<24;i++) {
        hours.push(Sprite({
            x : i*16,
            y : 32,
            width : 15,
            height : 15,
            color : HOUR_COLOR
        }))
    }

    for (let i=0;i<60;i++) {
        seconds.push(Sprite({
            x : i*8,
            y : 64,
            width : 7,
            height : 7,
            color : "blue"
        }));

        mins.push(Sprite({
            x : i*8,
            y : 96,
            width : 7,
            height : 7,
            color : "green"
        }));
    }


    let loop = GameLoop({  // create the main game loop
        update: function() { // update the game state
            for(let i=0;i<hours.length;i++) {
                hours[i].update();
            }
            for (let i=0;i<seconds.length;i++) {
                seconds[i].update();
            }
            for (let i=0;i<mins.length;i++) {
                mins[i].update();
            }
            counter++;
            if (counter>60) {
                counter = 0;

                // now check
                let now = Date.now();
                theOneTrueDate.setTime(now);
                
                setSecondsClear();
                setHoursClear();
                setMinsClear();

                seconds[theOneTrueDate.getSeconds()].color = "yellow";
                hours[theOneTrueDate.getHours()].color = "yellow";
                mins[theOneTrueDate.getMinutes()].color = "yellow";
            }
        },
        render: function() { // render the game state
            for(let i=0;i<hours.length;i++) {
                hours[i].render();
            }
            for (let i=0;i<seconds.length;i++) {
                seconds[i].render();
            }
            for (let i=0;i<mins.length;i++) {
                mins[i].render();
            }
        }
      });
      
      loop.start();    // start the game    

}

window.onload = main;