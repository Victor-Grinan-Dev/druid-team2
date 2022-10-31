const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const numbers = [
    "1","2","3","4","5","6","7","8","9","0"
];

const symbols = [
    '*', '#', '%', '&', '!', '?'
]

const allowedChars = [...symbols, ...alphabet, ...numbers]

export const getRandomIndex = () => {
   const max = allowedChars.length;
   return Math.floor(Math.random() * max);
}

export const genId = (amount = 4) => {
    const id = []
    for (let len = 0; len < amount; len++){
        id.push(allowedChars[getRandomIndex()])
    }
    console.log(id.join(""))
    return 
};