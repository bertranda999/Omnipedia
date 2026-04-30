

influenceInput = document.getElementById('influence-input')
influenceOutput = document.getElementById('influence-output')
influenceInput.addEventListener('input', function (event) {
    influenceOutput.innerText = this.value
})