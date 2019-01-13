const getOldSelectAndOptions = () => {
    const select = document.querySelector('#club');
    const options = document.querySelectorAll('option');
    return {
        'select': select,
        'options': options
    };

}

const createNewSelectAndOptions = (options) => {
    const newSelect = document.createElement('div');
    newSelect.classList.add('customSelect');
    newSelect.classList.add('select');
    newSelect.setAttribute('name', 'newClub');
    newSelect.setAttribute('id', 'newClub');
    const selectedOption = document.createElement('div');
    selectedOption.textContent = 'Barcelona';
    selectedOption.setAttribute('value', 'barcelona');
    selectedOption.innerHTML += '<img src="img/barcelona.png">';
    selectedOption.classList.add('selectedOption');
    newSelect.appendChild(selectedOption);
    const img = ['img/barcelona.png', 'img/manUtd.png', 'img/manCity.png', 'img/real.png', 'img/bayern.png'];

    for (let i = 0; i < options.length; i++) {
        const newOption = document.createElement('div');
        newOption.classList.add('customOption');
        const imgNewOption = document.createElement('img');
        imgNewOption.setAttribute('src', img[i]);
        newOption.setAttribute('value', options[i].value);
        newOption.textContent += options[i].text;
        newOption.appendChild(imgNewOption);
        newSelect.appendChild(newOption);
    }
    document.body.appendChild(newSelect);
    return newSelect;
}

const handle = (newSelect, oldSelect, oldOptions) => {
    const allNewOptions = document.querySelectorAll(".customOption");
    const newSelectedOption = document.querySelector('.selectedOption');
    //handler newSelect
    newSelect.addEventListener('click', () => {
        newSelect.classList.toggle('customSelect');
        newSelect.classList.toggle('customSelectSelecting');
        //Toggle visiblity to options
        allNewOptions.forEach(option => {
            option.classList.toggle('customOptionVisible');
            //Add bgc on hover option
            option.addEventListener('mouseover', () => {
                option.style.backgroundColor = '#0984e3';
            })
            //Remove bgc on mouseout
            option.addEventListener('mouseout', () => {
                option.style.backgroundColor = 'transparent';
            })
            //Change value in newSelect
            option.addEventListener('click', () => {
                newSelectedOption.textContent = option.textContent;
                newSelectedOption.setAttribute('value', option.getAttribute('value'));
                newSelectedOption.innerHTML += `<img src="img/${option.getAttribute('value')}.png">`;
            })
        })
        //Change value in oldSelect
        for (let i = 0; i < oldSelect.length; i++) {
            oldOptions.forEach(option => {
                option.selected = '';
                if (option.value === newSelectedOption.getAttribute('value')) {
                    option.selected = 'selected';
                }

            })
        }
    })
    //handler oldSelect, change value in newSelect
    oldSelect.addEventListener('change', () => {
        oldOptions.forEach(option => {
            if (option.value === oldSelect.value) {
                newSelectedOption.setAttribute('value', option.value);
                newSelectedOption.textContent = option.textContent;
                newSelectedOption.innerHTML += `<img src="img/${option.value}.png">`;
            }
        })
    })
}

const btnCreate = () => {
    const button = document.createElement('button');
    button.textContent = "Submit";
    document.body.appendChild(button);
}

const btnHandler = (newSelect, oldSelect) => {
    const btn = document.querySelector('button');
    const output = document.createElement('div');
    output.classList.add('output');
    const outputOldSelectValue = document.createElement('p');
    const outputNewSelectValue = document.createElement('p');
    btn.addEventListener('click', () => {
        outputOldSelectValue.textContent = `Value of oldSelect: ${oldSelect.value}`;
        outputNewSelectValue.textContent = `Value of newSelect: ${newSelect.childNodes.item(0).getAttribute('value')}`;
    })
    output.appendChild(outputOldSelectValue);
    output.appendChild(outputNewSelectValue);
    document.body.appendChild(output);
}




const init = () => {
    const old = getOldSelectAndOptions();
    const newSelect = createNewSelectAndOptions(old.options);
    handle(newSelect, old.select, old.options);
    btnCreate();
    btnHandler(newSelect, old.select);
}
init();