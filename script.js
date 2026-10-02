// 1. Charger les tâches mli t-fettah la page
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    // Permettre d'ajouter avec la touche "Enter"
    document.getElementById("taskInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
});

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (!taskText) {
       alert("Veuillez saisir une tâche !");
        return;
    }

    createTaskElement(taskText, false, false);
    saveTasks();

    input.value = "";
    input.focus();
}

function createTaskElement(text, completed = false, urgent = false) {
    const li = document.createElement("li");
    li.style.cssText = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; transition: all 0.3s ease;";

    const span = document.createElement("span");
    span.textContent = text;
    span.style.cursor = "pointer";

    if (completed) span.style.textDecoration = "line-through";
    if (urgent) span.style.color = "#e74c3c";

    // Toggle Completed (Click)
    span.onclick = () => {
        span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
        saveTasks();
    };

    // Toggle Urgent (Double Click)
    span.ondblclick = () => {
        span.style.color = span.style.color === "rgb(231, 76, 60)" ? "inherit" : "#e74c3c";
        saveTasks();
    };

    // Bouton Supprimer
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.cssText = "border: none; background: transparent; cursor: pointer;";
    deleteBtn.onclick = () => {
        li.style.opacity = "0";
        li.style.transform = "translateX(20px)";
        setTimeout(() => {
            li.remove();
            saveTasks();
        }, 300);
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

// 2. Sauvegarder f LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const span = li.querySelector("span");
        tasks.push({
            text: span.textContent,
            completed: span.style.textDecoration === "line-through",
            urgent: span.style.color === "rgb(231, 76, 60)"
        });
    });
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// 3. Charger les tâches au démarrage
function loadTasks() {
    const saved = localStorage.getItem("myTasks");
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(t => createTaskElement(t.text, t.completed, t.urgent));
    }
}