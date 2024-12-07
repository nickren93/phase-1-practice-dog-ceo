console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", init)


function init(){
    const dogImageList = document.querySelector("#dog-image-container")
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    //Handle the result: If the JSON response is an array, you're done. 
    //If it's an object, you might need to extract the array from it.
    .then(
        returnArray => {
            returnArray.message.forEach(element => {
                const img = document.createElement("img")
                img.setAttribute("src", `${element}`)
                dogImageList.append(img)
            });  
        }
    )

    const dogBreedList = document.querySelector("#dog-breeds")
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(
        data => {
            returnObject = data.message
            returnArray = Object.entries(returnObject)
            returnArray.forEach(element => {
                const breedBranches = element[1]
                const li = document.createElement("li")
                li.setAttribute("class", `${element[0][0]}`)
                li.style.display = ""
                li.addEventListener("click", changeTextColor)
                li.innerHTML = `${element[0]} <ul></ul>`
                breedBranches.forEach(branch => {
                    const l = document.createElement("li")
                    l.textContent = branch
                    li.querySelector("ul").appendChild(l)})
                dogBreedList.append(li)
            });  
        }
    )

    //function for changing font color when dog name li has been clicked:
    function changeTextColor(eventObject){
        eventObject.target.style.color= "blue"
    }

    //function for selector:
    const selectList = document.querySelector("#breed-dropdown")
    selectList.className = "list"
    selectList.addEventListener("change", filterBreed)

    function filterBreed(){
        let currentValue = this.value
        const breedList = document.querySelectorAll("ul li")
        for(const element of breedList){
            if(element.className == currentValue){
                element.style.display = ""
            }else if(element.className != currentValue){
                element.style.display = "none"
            }
        }
    }

}

