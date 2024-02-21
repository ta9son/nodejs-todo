const params =window.location.search;
const id = new URLSearchParams(params).get("id");
const taskIDDOM = document.querySelector(".task-eidt-id");
const taskNameDOM = document.querySelector(".task-eidt-name");
const formDOM = document.querySelector(".single-task-form");
const alertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-eidt-completed");

console.log(id);



const showTask = async () => {
    try {
        const {data: task} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id, completed, name} = task;
        console.log(task);
        taskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }

    } catch (error) {
        console.log(error);    
    }

}

showTask();



// タスクの編集
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;
        const {data: task} = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted
        });
        alertDOM.textContent = "タスクを編集しました";
        alertDOM.style.color = "green";
    } catch (error) {
        console.log(error);
        alertDOM.textContent = "タスクを編集できませんでした";
        alertDOM.style.color = "red";

    };

    setTimeout(() => {
        alertDOM.textContent = "";
    }, 3000);
});

