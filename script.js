const p = document.getElementById('error')
const search = document.getElementById("search")
const button = document.getElementById('button').addEventListener('click', getData)
const showWord = document.getElementById('word')
const section = document.getElementById('section')
search.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        p.innerHTML = 'carregando...'
        getData()
    }
})
// Get API data
function getData() {
    let word = search.value
    if (search.value.length == 0) {
        p.innerHTML = 'Por favor, busque alguma palavra.'
        return 0;
    }
    p.innerHTML = '' // Delete the error message if user type valid data
    const url = fetch(`https://significado.herokuapp.com/${word}`)
        .then(response => response.json())
        .then(data => {
            let newData = [].concat(data) 
            displayData(word, newData)
        }).catch(reject => {
            p.innerHTML = 'Palavra não encontrada. (404)'
        })
}
// Display data in DOM
function displayData(word, data) {
    const body = document.querySelector('body')
    // Remove div with old meaning
    let allMeanings = document.getElementById('allMeanings').remove()
    // Create it again but empty
    section.insertAdjacentHTML('beforeend', `<div id='allMeanings'></div>`)
    allMeanings = document.getElementById('allMeanings')
    showWord.innerHTML = word.toUpperCase()
    for (k in data) {
        allMeanings.insertAdjacentHTML('beforeend', `<p class="p-class">${data[k].class.toUpperCase()} </p>`)
        for (i in data[k].meanings) {
            if (data[k].meanings[i][0] == '[') {
                let newMeanings = data[k].meanings[i].replace('[', '_').replace(']', '_')
                newMeanings = newMeanings.split('_')
                allMeanings.insertAdjacentHTML('beforeend', `
                <p class='p-meanings'>
                    <span class="p-meanings-span">[${newMeanings[1]}]</span>
                    ${newMeanings[2]}
                </p>`)
            } else {
                allMeanings.insertAdjacentHTML('beforeend', `<p class='p-meanings'>${data[k].meanings[i]}</p>`)
            }
        }
    }
}
