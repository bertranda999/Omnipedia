cooldownDecrease = 1.0

function updateAmount() {
    boost = 1.0
    amount = 0
    document.querySelectorAll(".boost").forEach(boostEffect => {
        if (boostEffect.checked) {
            boost *= (1 + (boostEffect.getAttribute('data-value') / 100.0))
        }
    })

    document.querySelectorAll(".amount-checkbox").forEach(amountEffect => {
        if (amountEffect.checked) {
            amount += Number(amountEffect.getAttribute('data-value'))
        }
    })

    document.querySelectorAll(".amount-count").forEach(amountEffect => {
        valueNumber = Number(amountEffect.value)
        if (valueNumber > 0) {
            amount += valueNumber * Number(amountEffect.getAttribute('data-value'))
        }
    })

    valueMin = (8 + amount) * boost
    valueMax = (16 + amount) * boost
    document.getElementById('final-value').innerText = valueMin.toFixed(2) + " - " + valueMax.toFixed(2)
}

document.querySelectorAll(".cooldown").forEach(cooldownEffect => {
    cooldownEffect.addEventListener('click', function (event) {
        cooldownDecrease = 1.0
        document.querySelectorAll(".cooldown").forEach(cooldownEffect => {
            if (cooldownEffect.checked) {
                cooldownDecrease *= ((100.0 - cooldownEffect.getAttribute('data-value')) / 100.0)
            }
        })

        cooldown = 20.0 * cooldownDecrease
        document.getElementById('final-cooldown').innerText = cooldown.toFixed(2)
    })
})

document.querySelectorAll(".boost").forEach(boostEffect => {
    boostEffect.addEventListener('click', function (event) {
        updateAmount()
    })
})

document.querySelectorAll(".amount-checkbox").forEach(checkbox => {
    checkbox.addEventListener('click', function (event) {
        updateAmount()
    })
})

document.querySelectorAll(".amount-count").forEach(select => {
    select.addEventListener('input', function (event) {
        updateAmount()
    })
})