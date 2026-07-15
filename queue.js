let queue_size = null;
let queue_front = -1;
let queue_rear = -1;
let queue_array = [];



function updatefrontrearposition(){
    const front_pos = document.getElementById('front-pos');
    const rear_pos = document.getElementById('rear-pos');
    // if(queue_front==-1){

    // }
    // if(rear_front==-1){

    // }
    if(queue_front==queue_rear){
        rear_pos.style.bottom="-50px";
    }
    else{
        rear_pos.style.bottom="-30px";
    } 
    front_pos.style.left=`${8+(50*queue_front)}px`;
    rear_pos.style.left=`${8+(50*queue_rear)}px`;
}

function getQueueElements() {
    return {
        status: document.getElementById('queue-status'),
        front: document.getElementById('queue-front'),
        rear: document.getElementById('queue-rear')
    };
}

function initializeQueue() {
    const size = Number(document.getElementById('queue_size').value);

    if (!size || size <= 0) {
        queue_updateStatus('Please enter a valid queue size.', 'error');
        return;
    }

    queue_size = size;
    queue_front = -1;
    queue_rear = -1;
    queue_array = [];
    
    const displayElem = document.getElementById('queue_display');
    if (!displayElem) {
        console.error('queue_display element not found');
        return;
    }
    
    document.getElementById('enqueue-value').value = '';
    document.getElementById('dequeue_value').value = '';
    document.getElementById('queue_peek_value').value = '';

    let elements = '';
    for (let i = 0; i < size; i++) {
        elements += `<div class="stack-element" id="queue-element-${i}"></div>`;
    }

    const content = `
        <div class="stack-container">
            <div id="front-pos">front</div> 
            <div id="rear-pos">rear</div>
            ${elements}
        </div>
    `;

    displayElem.innerHTML = content;
    queue_updateFrontRearDisplay();
    queue_updateStatus('Queue initialized. Ready for operations.', 'success');
}

function Enqueue() {
    const enqueueInput = document.getElementById('enqueue-value');
    const value = enqueueInput.value.trim();

    if (!value) {
        queue_updateStatus('Enter a value to enqueue.', 'error');
        return;
    }

    if (queue_rear + 1 >= queue_size) {
        queue_updateStatus('Overflow! Cannot enqueue into a full queue.', 'error');
        enqueueInput.value = '';
        return;
    }

    // First element
    if (queue_front === -1) {
        queue_front = 0;
    }

    queue_rear++;
    queue_array[queue_rear] = value;
    const element = document.getElementById(`queue-element-${queue_rear}`);
    if (element) {
        element.innerHTML = value;
    }
    enqueueInput.value = '';
    queue_updateFrontRearDisplay();
    queue_updateStatus(`Enqueued ${value} successfully.`, 'success');
    updatefrontrearposition()
}

function Dequeue() {
    if (queue_front === -1 || queue_front > queue_rear) {
        queue_updateStatus('Underflow! Cannot dequeue from an empty queue.', 'error');
        return;
    }

    const dequeueDisplay = document.getElementById('dequeue_value');
    const dequeuedValue = queue_array[queue_front];

    dequeueDisplay.value = dequeuedValue;
    
    // Clear current front element
    const element = document.getElementById(`queue-element-${queue_front}`);
    if (element) {
        element.innerHTML = '';
    }

    // If last element
    if (queue_front === queue_rear) {
        queue_front = -1;
        queue_rear = -1;
        queue_array = [];
    } else {
        queue_front++;
    }

    queue_updateFrontRearDisplay();
    queue_updateStatus(`Dequeued ${dequeuedValue}.`, 'success');
    updatefrontrearposition()
}

function queue_Peek() {
    if (queue_front === -1 || queue_front > queue_rear) {
        queue_updateStatus('Underflow! Nothing to peek at.', 'error');
        return;
    }

    const peekDisplay = document.getElementById('queue_peek_value');
    const peekValue = queue_array[queue_front];

    peekDisplay.value = peekValue;
    queue_updateStatus(`Peeked ${peekValue}.`, 'idle');
}

function queue_updateFrontRearDisplay() {
    const elems = getQueueElements();
    if (elems.front) elems.front.textContent = `Front: ${queue_front === -1 ? '-' : queue_front}`;
    if (elems.rear) elems.rear.textContent = `Rear: ${queue_rear === -1 ? '-' : queue_rear}`;
    updatefrontrearposition()
}

function queue_updateStatus(message, type = 'idle') {
    const elems = getQueueElements();
    if (elems.status) {
        elems.status.textContent = `Status: ${message}`;
        elems.status.className = `status-pill ${type === 'success' ? 'status-success' : type === 'error' ? 'status-error' : 'status-idle'}`;
    }
    updatefrontrearposition()
}