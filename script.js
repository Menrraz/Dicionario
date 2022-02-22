const p = document.getElementById('result')
const search = document.getElementById("search")
const button = document.getElementById('button').addEventListener('click', getData)
const showWord = document.getElementById('word')
const section = document.getElementById('section')
// Get API data
function getData() {
    let word = search.value
    if (search.value.length == 0) {
        p.innerHTML = 'Por favor, busque alguma palavra.'
        return 0;
    }
    p.innerHTML = ''
    const url = fetch(`https://significado.herokuapp.com/${word}`)
        .then(response => response.json())
        .then(data => {
            let count = data.length
            const { etymology, meanings } = data[0]
            let newData = [].concat(data) 
            console.log(newData)
            mean(word, newData)
        }).catch(reject => {
            p.innerHTML = 'Palavra não encontrada. (404)'
        })
}
// Display data in DOM
function mean(word, data) {
    const body = document.querySelector('body')
    body.style.justifyContent = 'flex-start'
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
                let newMeanings = data[k].meanings[i].replace('[', '-').replace(']', '-')
                newMeanings = newMeanings.split('-')
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



/*
function getData() {
    let word = search.value
    const url = fetch(`https://significado.herokuapp.com/${word}`)
        .then(response => response.json())
        .then(data => {
            const { etymology, meanings } = data[0]
            console.log(data)
            console.log(data[0].meanings)

            mean(meanings, word)
        }).catch(reject => {
            p.innerHTML = 'Palavra não encontrada. (404)'
        })
}
*/
/*
function mean(meanings, word) {
    // Remove div with old meaning
    let allMeanings = document.getElementById('allMeanings').remove()
    // Create it again but empty
    section.insertAdjacentHTML('beforeend', `<div id='allMeanings'></div>`)
    allMeanings = document.getElementById('allMeanings')
    showWord.innerHTML = word
    for (i in meanings) {
        if (meanings[i][0] == '[') {
            // It servers to style what's inside '[]' with other color
            let newMeanings = meanings[i].replace('[', '-').replace(']', '-')
            newMeanings = newMeanings.split('-')
            allMeanings.insertAdjacentHTML('afterbegin', `
                    <p class='p-meanings'> 
                        - <span class='p-meanings-span'>[${newMeanings[1]}]</span>
                        ${newMeanings[2]}
                    </p>
                `)
        } else {
            console.log(meanings[i])
            allMeanings.insertAdjacentHTML('afterbegin', `
                    <p class='p-meanings'> - ${meanings[i]}</p>
                `)
        }
    }
}
*/