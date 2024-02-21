const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const inputDOM = document.querySelector(".task-input");
const alertDOM = document.querySelector(".form-alert");

const showTasks = async () => {
    try {
        const {data: tasks } = await axios.get("/api/v1/tasks");
        console.log(tasks.length);

        // タスクがない場合
        if (tasks.length === 0) {
            tasksDOM.innerHTML = `<h3 class="empty-list">タスクがありません</h3>`;
            return;
        };

        // タスクを出力する
        const allTasks = tasks.map( (task) => {
            // console.log(task);
            const { _id, name, completed } = task;
            return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span>${name}</span>
            </h5>
            <div class="task-links">
                <a href="edit.html?id=${_id}" class="edit-link">編集</a>
                <button type="button" class="delete-btn" data-id="${_id}">削除</button>
            </div>
        </div>`;
        });

        tasksDOM.innerHTML = allTasks.join("");


    } catch (error) {
        console.log(error);        
    }
}


showTasks();



// タスクを新規作成する
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = inputDOM.value;

    try {
        await axios.post("/api/v1/tasks" , {
            name: name,

        });
        showTasks();
        inputDOM.value = "";
        alertDOM.textContent = "タスクを追加しました";
        alertDOM.style.color = "green";
    } catch (error) {
        console.log(error);        
        alertDOM.textContent = "エラーが発生しました";
        alertDOM.style.color = "red";
    }

    setTimeout( () => {
        alertDOM.textContent = "";
    }, 3000);

});


// タスクを削除する
tasksDOM.addEventListener("click", async (e) => {
    const element = e.target;
    console.log(element.parentElement);
    
    if (element.classList.contains("delete-btn")) {
        const id = element.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
})