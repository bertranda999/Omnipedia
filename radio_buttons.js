let playerName = 'Player Name'
nameType = 'Name_Effect_None'

legionName = 'Legion Name'

function updatePlayerName() {
    nameEffectElement = document.getElementById('name-effect-element')
    if (nameEffectElement != null) {
        nameEffectElement.remove()
    }
    if (nameType == 'Name_Effect_None') {
        nameElement = document.getElementById('playername')
        newElement = document.createElement('span')
        newElement.setAttribute('id', 'name-effect-element')
        newElement.append(playerName)
        nameElement.append(newElement)

    }
    else if (nameType == 'Ripple') {
        newElement = document.createElement('span')
        newElement.setAttribute('id', 'name-effect-element')
        newElement.setAttribute('class', 'title-ripple')
        newElement.setAttribute('style', 'font-weight:bold;')




        for (const [index, char] of [...playerName].entries()) {
            if (char == ' ') {
                newElement.append(' ')
                continue
            }
            charElement = document.createElement('span')
            charElement.setAttribute('class', 'title-ripple-char')
            charElement.setAttribute('style', 'animation-delay:' + 8 * index / 100 + 's')
            charElement.append(char)
            newElement.append(charElement)
        }

        nameElement = document.getElementById('playername')
        nameElement.append(newElement)
    }

    previewElement = document.getElementById('ripple-preview')
    previewElement.remove()
    newPreviewElement = document.createElement('span')
    newPreviewElement.setAttribute('id', 'ripple-preview')
    newPreviewElement.setAttribute('style', 'font-weight:bold;')

    for (const [index, char] of [...playerName].entries()) {
        if (char == ' ') {
            newPreviewElement.append(' ')
            continue
        }

        previewCharElement = document.createElement('span')
        previewCharElement.setAttribute('class', 'title-ripple-char')
        previewCharElement.setAttribute('style', 'animation-delay:' + 8 * index / 100 + 's')
        previewCharElement.append(char)
        newPreviewElement.append(previewCharElement)
    }

    previewLabelElement = document.getElementById('Ripple-label')
    previewLabelElement.append(newPreviewElement)

}

const radioGroups = document.querySelectorAll('[data-group]');
console.log("Script")
console.log(radioGroups.length)
radioGroups.forEach(group => {

    const groupButtons = document.querySelectorAll('input[name=' + group.getAttribute('data-group') + ']')
    console.log(radioGroups.length)

    groupButtons.forEach(button => {
        button.addEventListener('change', function () {
            if (this.checked && this.getAttribute('name') == 'design') {
                displayElementId = 'display-' + group['data-group']
                document.getElementById('shipimg').setAttribute('src', this.getAttribute('data-img'))
                flairOverlay = document.getElementsByClassName('flair-effect-overlay')
                console.log(this.getAttribute('data-img'))
                flairOverlay[0].setAttribute('style', 'position: absolute; pointer-events: none; z-index: 10; left: 40px; top: 40px; width: 250px; height: 122px; background: linear-gradient(115deg, transparent 35%, rgba(255, 215, 0, 0.3) 45%, rgba(255, 255, 200, 0.5) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 65%) 0% 0% / 300% 100%; animation: 11s linear 0s infinite normal none running flair-goldshimmer; mask-image: url(\"' + this.getAttribute('data-img') + '\"); mask-size: 100% 100%; mask-repeat: no-repeat;')

            }
            else if (this.checked && this.getAttribute('name') == 'shield') {
                shieldElement = document.getElementById('shield')
                if (this.getAttribute('id') == 'Shield_None') {
                    shieldElement.remove()

                }
                else if (shieldElement != null) {
                    shieldElement.setAttribute('src', this.getAttribute('data-img'))
                }
                else {

                    //blankShield = document.getElementById('blank-shield')
                    //blankShield.remove()
                    newElement = document.createElement('img')
                    newElement.setAttribute('style', 'position:absolute; left: 40px; top: 50px; z-index:2; pointer-events:none; filter:brightness(150%);')
                    newElement.setAttribute('width', '350')
                    newElement.setAttribute('src', this.getAttribute('data-img'))
                    newElement.setAttribute('id', 'shield')
                    const wrapper = document.getElementById('flair-effect-wrapper')
                    wrapper.after(newElement)

                }


            }
            else if (this.checked && this.getAttribute('name') == 'name-effect') {

                nameType = this.getAttribute('id')
                updatePlayerName()
            }
        })
    })
})

const playerNameInput = document.getElementById('player-name-input')
playerNameInput.addEventListener('input', function () {
    playerName = this.value
    updatePlayerName()
})

const legionNameInput = document.getElementById('legion-name-input')
legionNameInput.addEventListener('input', function () {
    legionName = this.value
    element = document.getElementById('legion-name')
    element.innerText = legionName + ' (60)'
    console.log('trying')

})