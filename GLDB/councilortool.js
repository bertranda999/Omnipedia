
let data = []
async function loadRemoteJSON() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/bertranda999/GLWikiComponents/refs/heads/main/config/counciltooldata.json');

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response body as JSON
        data = await response.json();
        console.log(data[0]);
        influenceInput.max = data.length - 1
        influenceInput.value = 0
    } catch (error) {
        console.error("Could not load JSON:", error);
    }
}

loadRemoteJSON();

councilorsDiv = document.getElementById('councilors')
influenceInput = document.getElementById('influence-input')
influenceOutput = document.getElementById('influence-output')
influenceInput.addEventListener('input', function (event) {
    influenceOutput.innerText = data[this.value]['influence']


    councilorsDiv.innerHTML = ""

    tableElement = document.createElement('table')
    councilorsDiv.appendChild(tableElement)

    removalsOnly = 0
    removals = []
    for (let i = 0; i <= this.value; ++i) {
        if (Object.hasOwn(data[i], 'removals')) {
            data[i]['removals'].forEach(removal => {
                removals.push(removal)
            })
        }
    }
    console.log(removals)
    for (let i = 0; i <= this.value; i++) {
        if ((i - removalsOnly) % 7 == 0) {
            newRowElement = document.createElement('tr')
            tableElement.appendChild(newRowElement)
        }

        if (Object.hasOwn(data[i], 'councilors')) {
            data[i]['councilors'].forEach(councilor => {
                if (!removals.includes(councilor['name'])) {
                    newElement = document.createElement('div')
                    cellElement = document.createElement('th')
                    cellElement.setAttribute('width', '300')
                    newElement.innerText = councilor['name']
                    cellElement.appendChild(newElement)
                    tableElement.lastElementChild.appendChild(cellElement)
                }
            })
        } else {
            ++removalsOnly
        }
    }
})

