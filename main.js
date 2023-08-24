// start getting user name after pressing on the start game span
document.querySelector(".control-buttons span").onclick = function () {

    let yourName = prompt("What's Your Name");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();
}

// end getting user name after pressing on the start game span

let duration = 1000;

// start getting range of blocks in array 

let blocksContainer = document.querySelector(".blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);
// end getting range of blocks in array


// start adding order css property to game blocks 

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Add click Event
    block.addEventListener("click", function () {

        // triger the flip block function
        flipBlock(block);
    })

});

// end adding order css property to game blocks

// start functions 

// start Flib block function 
function flipBlock(selectedBlock) {
    // add class is-flipped
    selectedBlock.classList.add('is-flipped');

    // colled all flipped cards
    let flippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    // if there is two selected blocks
    if (flippedBlocks.length === 2) {

        // stop click function
        stopClicking();

        // check matched block function
        checkMathedBlocks(flippedBlocks[0], flippedBlocks[1]);
    }


}
// end Flib function 


// start stop clicking function

function stopClicking() {
    // add class no-clicking to blocks
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {

        // remover class no-clicking after the duration
        blocksContainer.classList.remove("no-clicking");

    }, duration)
}

// end stop clicking function

// start matched blocks function

function checkMathedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("match");
        secondBlock.classList.add("match");

        document.getElementById("success").play();

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");

        }, duration);

        document.getElementById("failure").play();


    }
}
// end matched blocks function

// start shuffle function
function shuffle(array) {
    let current = array.length, stash, random;

    while (current > 0) {
        random = Math.floor(Math.random() * current); // get a random num from 0 to 19;

        current--;
        // swapping current element with random element (3 steps)
        // 1- save current element in stash
        stash = array[current]

        // 2- current element = random element
        array[current] = array[random]

        // 3- random element = stash
        array[random] = stash;
    }

    return array;
}

// end shuffle function

// end functions 

