function getLclStrg(variableName){
    const temp = localStorage.getItem(variableName)
    if (!temp) return null
    return JSON.parse(temp)
}

function setLclStrg(variableName, data){
     localStorage.setItem(variableName, data)
}