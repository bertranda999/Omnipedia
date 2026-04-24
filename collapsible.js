var coll = document.getElementsByClassName("collapsible");
var i;
console.log('trying 1')
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        //this.classList.toggle("active");
        console.log('trying')
        var content = this.nextElementSibling;
        if (content.getAttribute('class') != 'content') {
            content = content.nextElementSibling
        }
        if (content.hidden) {
            content.hidden = false;
        } else {
            content.hidden = true;
        }
    });
}