const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
var apiUrl = 'https://api.pokemontcg.io/v1/cards?name=';

const searchValues = async searchText => {
    const res = await fetch('../Data/Pokemon.json');
    const names = await res.json();

    let matches = names.filter(name => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return name.Name.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
        cardsElement.innerHTML = '';
    }

    outputHtml(matches);
}

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.Name}</h4>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
};



function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    });
}

addGlobalEventListener("click", "h4", async e => {
    search.value = e.target.innerText;
    matchList.innerHTML = '';
    await getCards(search.value);
})

const cardsElement = document.querySelector('#cards');

async function getCards(pokemon) {
    cardsElement.innerHTML = '';
    const response = await fetch(apiUrl + pokemon);
    const json = await response.json();
    json.cards.forEach((card) => {
        const imagediv = document.createElement('div');
        imagediv.setAttribute('class', 'col-lg-4 col-md-6 mb-3');
        const image = document.createElement('img');
        image.src = card.imageUrl;
        image.setAttribute('class', 'pokemon')
        imagediv.appendChild(image);
        cardsElement.append(imagediv);
    });
}


search.addEventListener('input', () => searchValues(search.value));
