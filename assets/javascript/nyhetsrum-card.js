document.getElementById('card').style.display = "block";
document.getElementById('checkbox-width1').style.width = "40%";
document.getElementById('card2').style.display = "none";
document.getElementById('checkbox-width3').style.width = "25%";
document.getElementById('card3').style.display = "none";
document.getElementById('checkbox-width2').style.width = "25%";

function onlyOne(checkbox) {
    let checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })

    if (document.getElementById('checkbox1').checked) {
        document.getElementById('card').style.display = "block";
        document.getElementById('checkbox-width1').style.width = "40%";
    } else {
        document.getElementById('card').style.display = "none";
        document.getElementById('checkbox-width1').style.width = "25%";
    }

    if (document.getElementById('checkbox2').checked) {
        document.getElementById('card2').style.display = "block";
        document.getElementById('checkbox-width2').style.width = "40%";

    } else {
        document.getElementById('card2').style.display = "none";
        document.getElementById('checkbox-width2').style.width = "25%";
    }

    if (document.getElementById('checkbox3').checked) {
        document.getElementById('card3').style.display = "block";
        document.getElementById('checkbox-width3').style.width = "40%";

    } else {
        document.getElementById('card3').style.display = "none";
        document.getElementById('checkbox-width3').style.width = "25%";
    }
}