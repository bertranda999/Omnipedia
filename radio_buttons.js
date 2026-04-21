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
                flairOverlay[0].setAttribute('style', 'position: absolute; pointer-events: none; z-index: 10; left: 30px; top: 20px; width: 250px; height: 122px; background: linear-gradient(115deg, transparent 35%, rgba(255, 215, 0, 0.3) 45%, rgba(255, 255, 200, 0.5) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 65%) 0% 0% / 300% 100%; animation: 11s linear 0s infinite normal none running flair-goldshimmer; mask-image: url(\"' + this.getAttribute('data-img') + '\"); mask-size: 100% 100%; mask-repeat: no-repeat;')

            }
            else if (this.checked && this.getAttribute('name') == 'shield') {
                shieldElement = document.getElementById('shield')
                if (this.getAttribute('id') == 'Shield_None') {
                    shieldElement.remove()
                    console.log('Removed')

                    newElement = document.createElement('div')
                    newElement.setAttribute('style', 'height: 230;width: 350;')
                    newElement.setAttribute('id', "blank-shield")
                    const wrapper = document.getElementById('flair-effect-wrapper')
                    wrapper.after(newElement)

                }
                else if (shieldElement != null) {
                    shieldElement.setAttribute('src', this.getAttribute('data-img'))
                }
                else {

                    blankShield = document.getElementById('blank-shield')
                    blankShield.remove()
                    newElement = document.createElement('img')
                    newElement.setAttribute('style', 'z-index:2; pointer-events:none; filter:brightness(150%);')
                    newElement.setAttribute('width', '350')
                    newElement.setAttribute('src', this.getAttribute('data-img'))
                    newElement.setAttribute('id', 'shield')
                    const wrapper = document.getElementById('flair-effect-wrapper')
                    wrapper.after(newElement)

                }


            }
        })
    })
})