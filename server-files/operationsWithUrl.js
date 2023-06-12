

function checkIfUrlIsValid(url) {
    const urlRegex =  /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(?:\/[^\s]*)?$/;
    const ifValid =  urlRegex.test(url)
    if(ifValid) return true
    throw new Error("Bad url")

}

module.exports = {
    checkIfUrlIsValid: checkIfUrlIsValid,
}