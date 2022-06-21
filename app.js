window.addEventListener('load', solve);

function solve() {

    let input = {
        product: document.getElementById('type-product'),
        description: document.getElementById('description'),
        clientName: document.getElementById('client-name'),
        clientPhone: document.getElementById('client-phone')
    }

    let areas = {
        received: document.getElementById('received-orders'),
        completed: document.getElementById('completed-orders')
    }

    let btns = {
        send: document.querySelector('#right button'),
        clear: document.querySelector('#completed-orders button')
    }

    btns.send.addEventListener('click', sendForm);
    btns.clear.addEventListener('click', clearAll);

    function sendForm(event) {
        event.preventDefault();

        if (input.description.value == '' || input.clientName.value == '' || input.clientPhone.value == '') {
            return;
        }

       let div = createElem('div');
       div.classList.add('container');
       createElem('h2',`Product type for repair: ${input.product.value}`, div);
       createElem('h3',`Client information: ${input.clientName.value}, ${input.clientPhone.value}` ,div);
       createElem('h4',`Description of the problem: ${input.description.value}` ,div);
       
       let startRepairBtn = createElem('button', 'Start repair');
       startRepairBtn.classList.add('start-btn');
       startRepairBtn.addEventListener('click', startRepair);
       div.appendChild(startRepairBtn);

       let finishRepairBtn = createElem('button', 'Finish repair');
       finishRepairBtn.classList.add('finish-btn');
       finishRepairBtn.addEventListener('click', finishRepair);
       finishRepairBtn.disabled = true;
       div.appendChild(finishRepairBtn);
       areas.received.appendChild(div);
       
       input.description.value = '';
       input.clientName.value = '';
       input.clientPhone.value = '';

    }

    function startRepair(event){
     let [startBtn, finishBtn] = Array.from(event.currentTarget.parentElement.querySelectorAll('button'));
     startBtn.disabled = true;
     finishBtn.disabled = false;
    }

    function finishRepair(event){
    let currentElement = event.currentTarget.parentElement;
    Array.from(currentElement.querySelectorAll('button')).forEach(e => e.remove());
    areas.completed.appendChild(currentElement);
    }

    function clearAll(){
        Array.from(areas.completed.querySelectorAll('div')).forEach(e => e.remove());
    }

    function createElem(type, txt, appaned) {
        let element = document.createElement(type);
        if (txt != undefined) {
            element.textContent = txt;
        }
        if (appaned != undefined) {
            appaned.appendChild(element);
        }
        return element;
    }
}