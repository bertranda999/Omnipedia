const imgPath = 'https://galaxylegion1-1faae.kxcdn.com/images/planets/'

builderDiv = document.getElementById('builder')
builderImage = document.getElementById('builder-image')
builderSize = document.getElementById('builder-size')
builderType = document.getElementById('builder-type')
artifactsList = document.getElementById('artifact-list')
logDiv = document.getElementById('log')
structuresDiv = document.getElementById('structures')
structuresLabel = document.getElementById('structures-label')

artifactStatsSpan = document.getElementById('arti-stats')
miningStatsSpan = document.getElementById('min-stats')
researchStatsSpan = document.getElementById('res-stats')
influenceStatsSpan = document.getElementById('inf-stats')
attackStatsSpan = document.getElementById('at-stats')
defenseStatsSpan = document.getElementById('def-stats')
cloakStatsSpan = document.getElementById('cl-stats')
populationStatsSpan = document.getElementById('pop-stats')

filterInput = document.getElementById('filter-input')
spaceInput = document.getElementById('space-input')

artifactAvailabilityInput = document.getElementById('artifact-availability-input')
miningAvailabilityInput = document.getElementById('mining-availability-input')
researchAvailabilityInput = document.getElementById('research-availability-input')
influenceAvailabilityInput = document.getElementById('influence-availability-input')

fullyDeveloped = document.getElementById('fully-developed')

activeStructures = []

data = {}

availability = [
    "None",
    "Extremely Sparse",
    "Very Sparse",
    "Sparse",
    "Average",
    "Abundant",
    "Very Abundant",
    "Extremely Abundant",
    "Rich",
    "Very Rich",
    "Extremely Rich",
    "Ultra Rich",
    "Mega Rich"
]

for (let x = 1; x < 89; ++x) {
    availability.push(x + "x Mega Rich")
}

function addAvailabilityOptions(element) {
    for (let i = 0; i < availability.length; ++i) {
        optionElement = document.createElement('option')
        optionElement.setAttribute('value', availability[i])
        optionElement.innerText = availability[i]
        element.append(optionElement)
    }

}

addAvailabilityOptions(artifactAvailabilityInput)
addAvailabilityOptions(miningAvailabilityInput)
addAvailabilityOptions(researchAvailabilityInput)
addAvailabilityOptions(influenceAvailabilityInput)

filterInput.addEventListener('input', function (event) {
    artifactsList.innerHTML = ""
    filter = filterInput.value.toLowerCase()
    data['structures'].forEach(structure => {
        if (structure['name'].toLowerCase().includes(filter)) {
            optionElement = document.createElement('li')
            optionElement.setAttribute('role', 'option')
            optionElement.innerHTML = "<span class=\"button\"/>" + structure['name']
            optionElement.setAttribute('class', 'structure-button')
            optionElement.addEventListener('click', function (event) {

                if (hasEnoughSpace(structure['size']) && belowLimit(structure)) {
                    structuresDiv.innerHTML += "<br>" + structure['name']
                    activeStructures.push(structure)
                } else {
                    console.log('not enough space')
                }

                updateStats()
            })
            artifactsList.append(optionElement)
        }
    })
    /* buttons = document.querySelectorAll('.structure-button')
    for (let i = 0; i < buttons.length; ++i) {
        if (buttons[i].innerText.includes(filterInput.value)) {
            buttons[i].style.display = "block"
        } else {
            buttons[i].style.display = "none"
        }
    } */
    /* if (filterInput.value.length < 3) {
        document.querySelectorAll('.structure-button').forEach(element => {
            element.style.display = "block"
        })
    }
    document.querySelectorAll('.structure-button').forEach(element => {

        if (element.innerText.includes(filterInput.value)) {
            element.style.display = "block"
        } else {
            element.style.display = "none"
        }
    }) */
})

function hasEnoughSpace(needed) {
    let totalSpace = spaceInput.value
    let spaceUsed = 0
    activeStructures.forEach(structure => {
        spaceUsed += structure['size']
    })

    return needed <= totalSpace - spaceUsed
}

function belowLimit(structure) {
    let base = structure['name']
    if (Object.hasOwn(structure, 'base')) {
        base = structure['base']
    }

    let count = 0
    activeStructures.forEach(checkStructure => {
        let checkBase = checkStructure['name']
        if (Object.hasOwn(checkStructure, 'base')) {
            checkBase = checkStructure['base']
        }

        if (checkBase == base) {
            ++count;
        }
    })

    return count < structure['limit']
}

function availabilityLevel(value) {
    for (let i = 0; i < availability.length; ++i) {
        if (value == availability[i]) {

            return i
        }
    }

    return 0
}

function updateStats() {
    addValues = {
        "ap": 0,
        "aps": 0,
        "mp": 0,
        "mps": 0,
        "rp": 0,
        "rps": 0,
        "ip": 0,
        "ips": 0,
        "at": 0,
        "d": 0,
        "p": 0,
        "c": 0,
    }

    multValues = {
        "bap": 1,
        "bmp": 1,
        "brp": 1,
        "bip": 1,
        "bat": 1,
        "bd": 1,
        "bp": 1,
        "bc": 1,
    }

    let spaceUsed = 0

    activeStructures.forEach(structure => {
        for (key in addValues) {
            if (Object.hasOwn(structure, key)) {
                addValues[key] += structure[key]
            }
        }

        for (key in multValues) {
            if (Object.hasOwn(structure, key)) {
                multValues[key] *= ((100.0 + structure[key]) / 100.0)
            }
        }

        spaceUsed += structure['size']
        structuresLabel.innerText = `Structures (${spaceUsed} / ${spaceInput.value} Space)`
    })

    let artiValue = addValues['ap'] * multValues['bap'] * availabilityLevel(artifactAvailabilityInput.value) * .25
    let minValue = addValues['mp'] * multValues['bmp'] * (availabilityLevel(miningAvailabilityInput.value) * .25)
    let resValue = addValues['rp'] * multValues['brp'] * (availabilityLevel(researchAvailabilityInput.value) * .25)
    let infValue = addValues['ip'] * multValues['bip'] * (availabilityLevel(influenceAvailabilityInput.value) * .25)
    if (fullyDeveloped.checked) {
        artiValue *= 2
        minValue *= 2
        resValue *= 2
        infValue *= 2
    }

    artifactStatsSpan.innerHTML = `Production: ${artiValue.toFixed(2)} <br>Storage: ${addValues['aps']}<br>`
    miningStatsSpan.innerHTML = `Production: ${minValue.toFixed(2)}<br>Storage: ${addValues['mps']}<br>`
    researchStatsSpan.innerHTML = `Production: ${resValue.toFixed(2)}<br>Storage: ${addValues['rps']}<br>`
    influenceStatsSpan.innerHTML = `Production: ${infValue.toFixed(2)}<br>Storage: ${addValues['ips']}<br>`
    attackStatsSpan.innerHTML = `Attack: ${(addValues['at'] * multValues['bat']).toFixed(2)}<br>`
    defenseStatsSpan.innerHTML = `Defense: ${(addValues['d'] * multValues['bd']).toFixed(2)}<br>`
    populationStatsSpan.innerHTML = `Population: ${(addValues['p'] * multValues['bp']).toFixed(2)}<br>`
    cloakStatsSpan.innerHTML = `Cloak: ${(addValues['c'] * multValues['bc']).toFixed(2)}<br>`
}

async function loadRemoteJSON() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/bertranda999/GLWikiComponents/refs/heads/main/config/planetbuilderdata.json');

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response body as JSON
        data = await response.json();

        data['structures'].sort((a, b) => {
            return a['name'].localeCompare(b['name'])
        })

        data['structures'].forEach(structure => {
            optionElement = document.createElement('li')
            optionElement.setAttribute('role', 'option')
            optionElement.innerHTML = "<span class=\"button\"/>" + structure['name']
            optionElement.setAttribute('class', 'structure-button')
            optionElement.addEventListener('click', function (event) {

                if (hasEnoughSpace(structure['size']) && belowLimit(structure)) {
                    structuresDiv.innerHTML += "<br>" + structure['name']
                    activeStructures.push(structure)
                } else {
                    console.log('not enough space')
                }

                updateStats()
            })
            artifactsList.append(optionElement)


        })

        //influenceInput.value = 0
        //influenceInput.dispatchEvent(new Event('input', {bubbles: true }));
    } catch (error) {
        console.error("Could not load JSON:", error);
    }
}

loadRemoteJSON();

artifactAvailabilityInput.addEventListener('input', function (event) {

    updateStats()
})

miningAvailabilityInput.addEventListener('input', function (event) {

    updateStats()
})

researchAvailabilityInput.addEventListener('input', function (event) {

    updateStats()
})

influenceAvailabilityInput.addEventListener('input', function (event) {

    updateStats()
})

fullyDeveloped.addEventListener('click', function (event) {

    updateStats()
})