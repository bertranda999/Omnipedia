
influenceOutput = document.getElementById('influence-output')
influenceInput = document.getElementById('influence-input')
let data = []
function updateCurrentCost() {
    let modifier = 1.0

    reductionElements = document.querySelectorAll('.reduction-checkbox')

    reductionElements.forEach(element => {
        if (element.checked) {
            newModifier = (100.0 - element.getAttribute('data-reduction')) / 100.0

            modifier *= newModifier
        }
    })

    influenceOutput.innerText = Math.trunc(parseInt(data['levels'][influenceInput.value]['influence'].replace(',', '')) * modifier).toLocaleString()
}

reductionsDiv = document.getElementById('reductions-div')
function createReductionCheckbox(name, value) {
    inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'checkbox')
    inputElement.setAttribute('class', 'reduction-checkbox')
    inputElement.setAttribute('data-reduction', value)
    inputElement.setAttribute('id', name + 'reduction')
    inputElement.checked = false
    label = document.createElement('label')
    label.setAttribute('for', inputElement.id)
    label.innerText = name

    reductionsDiv.appendChild(inputElement)
    inputElement.after(label)

    inputElement.addEventListener('click', function (event) {
        updateCurrentCost()
    })
}

async function loadRemoteJSON() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/bertranda999/GLWikiComponents/refs/heads/main/config/counciltooldata.json');

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response body as JSON
        data = await response.json();

        influenceInput.max = data['levels'].length - 1

        data['costMods'].forEach(mod => {
            createReductionCheckbox(mod['name'], mod['value'])
        })


        influenceInput.value = 0
        influenceInput.dispatchEvent(new Event('input', { bubbles: true }));
    } catch (error) {
        console.error("Could not load JSON:", error);
    }
}

loadRemoteJSON();

councilorsDiv = document.getElementById('councilors')
seasonal1Input = document.getElementById('seasonal1')
seasonal2Input = document.getElementById('seasonal2')

function updateCouncilors() {


    councilorsDiv.innerHTML = ""

    tableElement = document.createElement('table')
    councilorsDiv.appendChild(tableElement)

    totalShowing = 0
    removals = []
    for (let i = 0; i <= influenceInput.value; ++i) {
        if (Object.hasOwn(data['levels'][i], 'removals')) {
            data['levels'][i]['removals'].forEach(removal => {
                removals.push(removal)
            })
        }
    }

    for (let i = 0; i <= influenceInput.value; i++) {

        if (Object.hasOwn(data['levels'][i], 'councilors')) {
            data['levels'][i]['councilors'].forEach(councilor => {
                if ((totalShowing) % 4 == 0) {
                    newRowElement = document.createElement('tr')
                    tableElement.appendChild(newRowElement)
                }

                if (!removals.includes(councilor['name']) && !Object.hasOwn(councilor, 'seasonal') ||
                    councilor['seasonal'] == seasonal1Input.value || councilor['seasonal'] == seasonal2Input.value) {

                    cellElement = document.createElement('td')
                    cellElement.setAttribute('width', '400')
                    cellElement.innerHTML = councilor['rarity'] + "<br>" + councilor['reward']
                    newRowElement.appendChild(cellElement)
                    ++totalShowing

                }
            })
        }
    }
}
influenceInput.addEventListener('input', function (event) {
    updateCurrentCost()

    updateCouncilors()

})

seasonal1Input.addEventListener('input', function (event) {
    updateCouncilors()
})

seasonal2Input.addEventListener('input', function (event) {
    updateCouncilors()
})