let stack_size = null;
let stacktop = -1;

const status = document.getElementById('status');
const displaytop = document.getElementById('top');

function initializeStack() {
    const size = Number(document.getElementById('stack_size').value);

    if (!size || size <= 0) {
        updateStatus('Please enter a valid stack size.', 'error');
        return;
    }

    stack_size = size - 1;
    stacktop = -1;
    document.getElementById('display1').innerHTML = '';
    document.getElementById('push-value').value = '';
    document.getElementById('popped_value').value = '';
    document.getElementById('peeked_value').value = '';

    let elements = '';
    for (let i = 0; i < size; i++) {
        elements += `<div class="stack-element" id="element-${i}"></div>`;
    }

    const content = `
        <div class="stack-container">
            <div id="top-pos">↑ top</div>
            ${elements}
        </div>
    `;

    document.getElementById('display1').innerHTML = content;
    update_top(-1);
    updateTopDisplay();
    updateStatus('Stack initialized. Ready for operations.', 'success');
}

function Push() {
    const pushInput = document.getElementById('push-value');
    const value = pushInput.value.trim();

    if (!value) {
        updateStatus('Enter a value to push.', 'error');
        return;
    }

    if (stacktop >= stack_size) {
        updateStatus('Overflow! Cannot push into a full stack.', 'error');
        pushInput.value = '';
        return;
    }

    stacktop++;
    const element = document.getElementById(`element-${stacktop}`);
    element.innerHTML = value;
    pushInput.value = '';
    update_top(stacktop);
    updateTopDisplay();
    updateStatus(`Pushed ${value} successfully.`, 'success');
}

function Pop() {
    if (stacktop === -1) {
        updateStatus('Underflow! Cannot pop from an empty stack.', 'error');
        return;
    }

    const element = document.getElementById(`element-${stacktop}`);
    const popDisplay = document.getElementById('popped_value');
    const poppedValue = element.innerHTML;

    popDisplay.value = poppedValue;
    element.innerHTML = '';
    stacktop--;
    update_top(stacktop);
    updateTopDisplay();
    updateStatus(`Popped ${poppedValue}.`, 'success');
}

function Peek() {
    if (stacktop === -1) {
        updateStatus('Underflow! Nothing to peek at.', 'error');
        return;
    }

    const topElement = document.getElementById(`element-${stacktop}`);
    const peekDisplay = document.getElementById('peeked_value');
    const peekValue = topElement.innerHTML;

    peekDisplay.value = peekValue;
    updateStatus(`Peeked ${peekValue}.`, 'idle');
}

function updateTopDisplay() {
    displaytop.textContent = `Top: ${stacktop}`;
}

function updateStatus(message, type = 'idle') {
    status.textContent = `Status: ${message}`;
    status.className = `status-pill ${type === 'success' ? 'status-success' : type === 'error' ? 'status-error' : 'status-idle'}`;
}

function update_top(top) {
    const top_pos = document.getElementById('top-pos');
    if (!top_pos) {
        return;
    }

    if (top < 0) {
        top_pos.style.bottom = '20px';
        return;
    }

    top_pos.style.bottom = `${20 + top * 64}px`;
}

updateTopDisplay();
updateStatus('Ready to initialize a stack.', 'idle');