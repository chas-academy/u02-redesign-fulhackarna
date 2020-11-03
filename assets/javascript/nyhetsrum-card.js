document.getElementById('card').style.display = "block";
document.getElementById('checkbox-width1').style.width = "40%";
document.getElementById('card2').style.display = "none";
document.getElementById('checkbox-width3').style.width = "25%";
document.getElementById('card3').style.display = "none";
document.getElementById('checkbox-width2').style.width = "25%";

const checkBoxOne = document.getElementById('checkbox1');
const checkBoxTwo = document.getElementById('checkbox2');
const checkBoxThree = document.getElementById('checkbox3');

function onlyOne(checkbox) {
    let checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    if (checkBoxOne.checked == false && checkBoxTwo.checked == false && checkBoxThree.checked == false) { //if all checkboxes are unchecked set box one to true
        checkBoxOne.checked = true;
    }
    if (checkBoxOne.checked) {
        document.getElementById('card').style.display = "block";
        document.getElementById('checkbox-width1').style.width = "40%";
    } else {
        document.getElementById('card').style.display = "none";
        document.getElementById('checkbox-width1').style.width = "25%";
    }

    if (checkBoxTwo.checked) {
        document.getElementById('card2').style.display = "block";
        document.getElementById('checkbox-width2').style.width = "40%";

    } else {
        document.getElementById('card2').style.display = "none";
        document.getElementById('checkbox-width2').style.width = "25%";
    }

    if (checkBoxThree.checked) {
        document.getElementById('card3').style.display = "block";
        document.getElementById('checkbox-width3').style.width = "40%";

    } else {
        document.getElementById('card3').style.display = "none";
        document.getElementById('checkbox-width3').style.width = "25%";
    }
}