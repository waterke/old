const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const randomMore = function(n){
    let newChars = ""
    for(let i=0;i<=n;i++){
        newChars += chars[Math.ceil(Math.random()*(chars.length-1))];
    }
    return newChars
}
export {randomMore}