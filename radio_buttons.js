let playerName = 'Player Name'
nameType = 'Name_Effect_None'

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


radioGroups.forEach(group => {

    const groupButtons = document.querySelectorAll('input[name=' + group.getAttribute('data-group') + ']')


    groupButtons.forEach(button => {
        let id = button.getAttribute('id')
        if (button.getAttribute('name') == 'shield' && id != 'Shield_None' && id != 'Shield_default') {

            sliderElement = document.getElementById(id + '-slider')
            sliderElement.addEventListener('input', function (event) {
                imageElement = document.getElementById(id + '-image')
                imageElement.setAttribute('style', 'filter: brightness(' + event.target.value + '%);')

                shieldElement = document.getElementById('shield')
                if (shieldElement && shieldElement.getAttribute('data-type') == id) {
                    shieldElement.setAttribute('style', 'width: 350; position:absolute; left: 0px; top: 0px; z-index:2; pointer-events:none; filter:brightness(' + event.target.value + '%);')
                }
            })

        }
        else if (button.getAttribute('name') == 'name-frame' && id != 'name-frame-none') {
            sliderElement = document.getElementById(id + '-slider')
            sliderElement.addEventListener('input', function (event) {
                previewElement = document.getElementById('preview-' + id)
                previewElement.setAttribute('style', 'filter:hue-rotate(' + this.value + 'deg)')

                other = document.getElementById('name-frame')
                if (other && other.getAttribute('data-frame') == id) {

                    other.setAttribute('style', button.getAttribute('data-style') + 'filter: hue-rotate(' + this.value + 'deg);')
                }
            })
        }

        button.addEventListener('change', function () {
            if (this.checked && this.getAttribute('name') == 'design') {
                displayElementId = 'display-' + group['data-group']
                document.getElementById('shipimg').setAttribute('src', this.getAttribute('data-img'))
                flairOverlay = document.getElementsByClassName('flair-effect-overlay')

                if (flairOverlay.length > 0) {
                    flairOverlay[0].setAttribute('style', 'position: absolute; pointer-events: none; z-index: 10; left: 40px; top: 40px; width: 250px; height: 122px; background: linear-gradient(115deg, transparent 35%, rgba(255, 215, 0, 0.3) 45%, rgba(255, 255, 200, 0.5) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 65%) 0% 0% / 300% 100%; animation: 11s linear 0s infinite normal none running flair-goldshimmer; mask-image: url(\"' + this.getAttribute('data-img') + '\"); mask-size: 100% 100%; mask-repeat: no-repeat;')
                }

                shimmerElement = document.getElementById('auric-shimmer-preview')
                shimmerElement.setAttribute('style', 'position: absolute; top: 0;left: 0;width: 100%;height: 100%;background: linear-gradient(115deg, transparent 35%, rgba(255,215,0,0.3) 45%, rgba(255,255,200,0.5) 50%, rgba(255,215,0,0.3) 55%, transparent 65%);background-size:300% 100%;pointer-events:none;animation:efp-ec474304 11s linear infinite;-webkit-mask-image:url(' + this.getAttribute('data-img') + ');mask-image:url(' + this.getAttribute('data-img') + ');-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;')

                shimmerImgElement = document.getElementById('auric-shimmer-img')
                shimmerImgElement.setAttribute('src', this.getAttribute('data-img'))


                defaultShieldData = document.getElementById('Shield_default')
                console.log('1')
                shieldElement = document.getElementById('shield')
                if (defaultShieldData.checked && this.hasAttribute('data-shield')) {
                    shieldElement.setAttribute('src', this.getAttribute('data-shield'))

                    shieldElement.setAttribute('style', 'position:absolute; left: 20px; top: 30px; z-index:2; width: 270')
                    console.log('2')
                    shieldElement.setAttribute('data-type', id)
                    shieldElement.hidden = false

                }
                console.log('3')

                defaultShieldCell = document.getElementById('default-shield-cell')
                if (this.hasAttribute('data-shield')) {
                    defaultShieldPreview = document.getElementById('default-shield-preview')
                    defaultShieldPreview.setAttribute('src', this.getAttribute('data-shield'))
                    defaultShieldData.setAttribute('data-img', this.getAttribute('data-shield'))
                    console.log('4')
                    defaultShieldCell.hidden = false
                }
                else {
                    console.log('5')
                    defaultShieldCell.hidden = true
                    if (defaultShieldData.checked) {
                        shieldElement.hidden = true
                        document.getElementById('Shield_None').checked = true
                    }
                }

            }
            else if (this.checked && this.getAttribute('name') == 'shield') {
                shieldElement = document.getElementById('shield')
                if (this.getAttribute('id') == 'Shield_None') {
                    shieldElement.hidden = true

                }
                else {
                    shieldElement.setAttribute('src', this.getAttribute('data-img'))
                    sliderElement = document.getElementById(id + '-slider')
                    if (sliderElement) {
                        shieldElement.setAttribute('style', 'width: 350;position:absolute; left: 0px; top: 0px; z-index:2; pointer-events:none; filter:brightness(' + sliderElement.value + '%);')
                    }
                    else {
                        shieldElement.setAttribute('style', 'position:absolute; left: 20px; top: 30px; z-index:2; width: 270')
                    }
                    shieldElement.setAttribute('data-type', id)
                    shieldElement.hidden = false
                }


            }
            else if (this.checked && this.getAttribute('name') == 'name-effect') {

                nameType = this.getAttribute('id')
                updatePlayerName()
            }
            else if (this.checked && this.getAttribute('name') == 'ship-effect') {
                // <div class=\"flair-effect-overlay\" style=\"position: absolute; pointer-events: none; z-index: 10; left: 40px; top: 40px; width: 250px; height: 133px; background: linear-gradient(115deg, transparent 35%, rgba(255, 215, 0, 0.3) 45%, rgba(255, 255, 200, 0.5) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 65%) 0% 0% / 300% 100%; animation: 11s linear 0s infinite normal none running flair-goldshimmer; mask-image: url(&quot;https://galaxylegion1-1faae.kxcdn.com/images/ships/abyssiod-right.png&quot;); mask-size: 100% 100%; mask-repeat: no-repeat;\"></div><style id=\"flair-effect-styles\">@keyframes flair-goldshimmer {   			0% { background-position: -200% 0; }   			20% { background-position: 100% 0; }   			100% { background-position: 100% 0; }   		}   </style>

                if (this.getAttribute('id') == 'Ship_Effect_None') {
                    element = document.getElementById('ship-effect')
                    element.remove()
                }
                else {
                    newElement = document.createElement('div')
                    newElement.setAttribute('id', 'ship-effect')
                    newElement.setAttribute('class', 'flair-effect-overlay')
                    newElement.setAttribute('style', 'position: absolute; pointer-events: none; z-index: 10; left: 40px; top: 40px; width: 250px; height: 133px; background: linear-gradient(115deg, transparent 35%, rgba(255, 215, 0, 0.3) 45%, rgba(255, 255, 200, 0.5) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 65%) 0% 0% / 300% 100%; animation: 11s linear 0s infinite normal none running flair-goldshimmer; mask-image: url(\"' + document.getElementById('shipimg').getAttribute('src') + '\"); mask-size: 100% 100%; mask-repeat: no-repeat;')

                    shipImgElement = document.getElementById('shipimg')
                    shipImgElement.after(newElement)

                }

            }
            else if (this.checked && this.getAttribute('name') == 'title') {
                existingTitle = document.getElementById('title')
                if (existingTitle) {
                    existingTitle.remove()
                }
                if (this.getAttribute('id') != 'title_none') {
                    // < div style =\"font-size: 14px;\"><span style=\"font-style:italic; font-weight:bold; color:#999999;\">the Dark One</span></div>
                    newElement = document.createElement('div')
                    newElement.setAttribute('id', 'title')
                    newElement.setAttribute('style', this.getAttribute('data-style'))
                    //newElement.innerText = this.getAttribute('data-title')
                    newElement.innerHTML = document.getElementById('label-' + this.getAttribute('data-title')).innerHTML

                    rankElement = document.getElementById('rank-div')
                    rankElement.before(newElement)
                }
            }
            else if (this.checked && this.getAttribute('name') == 'name-frame') {
                existingNameFrame = document.getElementById('name-frame')
                if (existingNameFrame) {
                    existingNameFrame.remove()
                }

                if (this.getAttribute('id') != 'name-frame-none') {
                    sliderElement = document.getElementById(id + '-slider')
                    newElement = document.createElement('img')
                    newElement.setAttribute('id', 'name-frame')
                    newElement.setAttribute('style', this.getAttribute('data-style') + 'filter: hue-rotate(' + sliderElement.value + 'deg);')
                    newElement.setAttribute('src', this.getAttribute('data-img'))
                    newElement.setAttribute('data-frame', id)

                    nameElement = document.getElementById('name-effect-element')
                    nameElement.before(newElement)
                }
            }
        })
    })
})

const playerNameInput = document.getElementById('player-name-input')
playerNameInput.addEventListener('input', function () {
    playerName = this.value
    updatePlayerName()
})

function updateLegion() {
    element = document.getElementById('legion-name')
    nameElement = document.getElementById('legion-name-input')
    memberElement = document.getElementById('member-count')
    element.innerText = nameElement.value + ' (' + memberElement.value + ') '

}

const legionNameInput = document.getElementById('legion-name-input')
legionNameInput.addEventListener('input', function () {
    updateLegion()

})

const memberCountInput = document.getElementById('member-count')
memberCountInput.addEventListener('input', function () {
    updateLegion()
})

const rankInput = document.getElementById('rank-input')
rankInput.addEventListener('input', function () {
    rankElement = document.getElementById('rank')
    rank.innerText = 'Rank ' + this.value
})

const raceInput = document.getElementById('race-input')
const professionInput = document.getElementById('profession-input')
function updateRaceProfession() {

    raceElement = document.getElementById('race')
    race.innerText = ' ' + raceInput.value + ' ' + professionInput.value

}

raceInput.addEventListener('input', function () {
    updateRaceProfession()
})

professionInput.addEventListener('input', function () {
    updateRaceProfession()
})

const tabs = document.querySelectorAll('[data-tab]')
function openTab(event, name) {

    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') != name) {
            htmlTab = document.getElementById(this.id)

            tab.hidden = true
        }
        else {
            htmlTab = document.getElementById(this.id)
            tab.hidden = false
        }
    })
}

const ceruleanCheckbox = document.getElementById('cerulean-checkbox')
ceruleanCheckbox.addEventListener('click', function () {
    fighter = document.getElementById('cerulean')
    fighter.hidden = !ceruleanCheckbox.checked
})

const nightclawCheckbox = document.getElementById('nightclaw-checkbox')
nightclawCheckbox.addEventListener('click', function () {
    fighter = document.getElementById('nightclaw')
    fighter.hidden = !nightclawCheckbox.checked
})