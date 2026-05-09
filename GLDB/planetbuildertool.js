const imgPath = 'https://galaxylegion1-1faae.kxcdn.com/images/planets/'

startingSizeInput = document.getElementById('starting-size-input')
startingTypeInput = document.getElementById('starting-type-input')
startingImageInput = document.getElementById('starting-image-input')
imagePreviewDiv = document.getElementById('image-preview')
startingDiv = document.getElementById('starting')
builderDiv = document.getElementById('builder')
builderImage = document.getElementById('builder-image')
builderSize = document.getElementById('builder-size')
builderType = document.getElementById('builder-type')
artifactsList = document.getElementById('artifact-list')
logDiv = document.getElementById('log')
structuresDiv = document.getElementById('structures')

artifactStatsSpan = document.getElementById('arti-stats')

activeStructures = []

let currentType = ""
let currentImage = 0
let currentSize = "Very Tiny"



data = {}

function hasEnoughSpace(needed) {
    let totalSpace = 0
    for (let i = 0; i < data['sizes'].len; ++i) {
        if (data['sizes'][i]['name'] == "Current Size") {
            totalSpace = data['sizes'][i]['defaultSpace']
            break
        }
    }

    let spaceUsed = 0
    activeStructures.forEach(structure => {
        spaceUsed += structure['size']
    })

    return needed < totalSpace - spaceUsed
}

function updateStats() {
    let ap = 0
    activeStructures.forEach(structure => {
        if (Object.hasOwn(structure, 'ap')) {
            ap += structure['ap']
        }
    })

    artifactStatsSpan.innerText = "From Structures: " + ap

}

function updateImageOptions(type) {
    startingImageInput.innerHTML = ""
    let count = 3

    if (Object.hasOwn(type, 'hasSpecialImage') && type['hasSpecialImage'] == "Yes") {
        count = 6
    }
    else if (type['name'] != "Aphotic" && type['name'] != "Ecumenopolis") {
        count = 5
    }

    for (let i = 1; i <= count; ++i) {
        optionElement = document.createElement('option')
        optionElement.setAttribute('value', i)
        optionElement.innerText = 'Image: ' + i
        startingImageInput.append(optionElement)
    }

    updatePreviewImage()
}

function updatePreviewImage() {
    imagePreviewDiv.innerHTML = ""

    imageElement = document.createElement('img')
    imageElement.setAttribute('src', imgPath + startingTypeInput.value.toLowerCase() + startingImageInput.value + ".png")
    imagePreviewDiv.append(imageElement)
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

        //influenceInput.max = data['levels'].length - 1

        //data['sizes'].forEach(mod => {

        //  createReductionCheckbox(mod['name'], mod['value'])
        //})
        data['sizes'].forEach(size => {
            optionElement = document.createElement('option')
            optionElement.setAttribute('value', size['name'])
            optionElement.innerText = size['name']
            startingSizeInput.append(optionElement)
        })

        data['types'].forEach(type => {
            optionElement = document.createElement('option')
            optionElement.setAttribute('value', type['name'])
            optionElement.innerText = type['name']
            startingTypeInput.append(optionElement)
        })

        updateImageOptions(data['types'][0])

        data['artifacts'].forEach(artifact => {
            optionElement = document.createElement('li')
            optionElement.setAttribute('role', 'option')
            optionElement.innerHTML = "<span class=\"button\"/>" + artifact['name']
            optionElement.setAttribute('selected', true)
            optionElement.setAttribute('data-name', artifact['name'])
            optionElement.addEventListener('click', function (event) {
                logDiv.innerHTML += "<br>Use: " + artifact['name']
                if (Object.hasOwn(artifact, 'planetEffects')) {
                    artifact['planetEffects'].forEach(effect => {
                        if (effect['type'] == "Construct Structure") {
                            structuresDiv.innerHTML += "<br>" + effect['structure']

                            data['structures'].forEach(structure => {
                                if (structure['name'] == effect['structure']) {
                                    if (hasEnoughSpace(structure['size'])) {
                                        activeStructures.push(structure)
                                    } else {
                                        console.log('not enough space')
                                    }
                                }
                            })


                        }
                    })

                    updateStats()
                }
            })
            artifactsList.append(optionElement)


        })

        //influenceInput.value = 0
        //influenceInput.dispatchEvent(new Event('input', { bubbles: true }));
    } catch (error) {
        console.error("Could not load JSON:", error);
    }
}

loadRemoteJSON();

startingTypeInput.addEventListener('input', function (event) {
    data['types'].forEach(type => {
        if (type['name'] == startingTypeInput.value) {
            updateImageOptions(type)
        }
    })

})

startingImageInput.addEventListener('input', function (event) {
    updatePreviewImage()
})

function finishSetup() {
    startingDiv.hidden = true

    currentImage = startingImageInput.value
    currentSize = startingSizeInput.value
    currentType = startingTypeInput.value

    builderImage.setAttribute('src', imgPath + startingTypeInput.value.toLowerCase() + startingImageInput.value + ".png")
    builderSize.innerText = currentSize
    builderType.innerText = currentType

    builderDiv.hidden = false
}