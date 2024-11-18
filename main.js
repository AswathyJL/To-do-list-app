
let taskArray = JSON.parse(localStorage.getItem('taskArrayLocal')) || []; //getting array from local storage or initializing to empty array
console.log(taskArray);

const displayTask = () => {
    tableBody.innerHTML = ''
    if(taskArray.length>0)
    {
        taskArray.forEach((task, index) => {
            let completedClass = task.completed ? 'text-decoration-line-through text-secondary' : ''
            let completedClassCheck = task.completed ? 'text-secondary' : 'text-success'
            tableBody.innerHTML += `
                                    <tr>
                                        <td id="task${index}" class="${completedClass}">${task.text}</td>
                                        <td ><button onclick="handleCheck(${index})" class="btn  rounded-circle ${completedClassCheck}">${task.completed ? `<i class="fa-solid fa-close"></i>`:`<i class="fa-solid fa-check"></i>`}</button></td>
                                        <td ><button onclick="handleDelete(${index})" class="btn text-danger rounded-circle"><i class="fa-solid fa-trash"></i></button></i></td>
                                    </tr>
            `
        })
    }
    else
    {
        tableBody.innerHTML = `<tr>
                                    <td class="colspan-3 text-center text-secondary fw-bold">No task added yet!!!</td>
                                </tr>`
    }
    
}


const addTask = () => {
    if(inputId.value)
    {
        // taskArray.push(inputId.value) //task is pushed to the array
        taskArray.push({text:inputId.value, completed:false}) //task is pushed to the array
        console.log(`Inside addTask function. current task is`);
        console.log(taskArray);
        
        // setting item inside local storage
        localStorage.setItem('taskArrayLocal',JSON.stringify(taskArray)) //update local storage
        displayTask()
        
        inputId.value = ""
        noTask.innerText = ''
    }
    else
    {
        noTask.innerText = 'Please enter your task here!!!'
    }

}

const handleCheck = (indexCheck) => {
    taskArray[indexCheck].completed = !taskArray[indexCheck].completed //toggle 
    localStorage.setItem('taskArrayLocal',JSON.stringify(taskArray)) //update local storage 
    displayTask()
    // element.classList.add('new class')
}

const handleDelete = (row) => {
    // button.closest('tr').remove()
    taskArray.splice(row,1)
    localStorage.setItem('taskArrayLocal',JSON.stringify(taskArray)) //update local storage
    displayTask()
}

const allClear = () => {
    localStorage.clear()
    taskArray = []
    displayTask()
}

displayTask();