document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('titleInput');
    const descInput = document.getElementById('descriptionInput');
    const saveBtn = document.getElementById('saveTaskBtn');
    const pending = document.getElementById('pendingTaskTable');
    const completed = document.getElementById('completedTaskTable');
    const progress = document.getElementById('progress');

    function updateProgress() {
        progress.textContent = `Pending: ${pending.children.length} | Completed: ${completed.children.length}`;
    }

    function saveToStorage() {
        localStorage.setItem('pendingTasks', pending.innerHTML);
        localStorage.setItem('completedTasks', completed.innerHTML);
    }

    function rebindEvents() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    const row = checkbox.closest('tr');
                    checkbox.disabled = true;
                    row.classList.add('completed-row');
                    completed.appendChild(row);
                    updateProgress();
                    saveToStorage();
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('tr').remove();
                updateProgress();
                saveToStorage();
            });
        });
    }

    function restoreFromStorage() {
        pending.innerHTML = localStorage.getItem('pendingTasks') || '';
        completed.innerHTML = localStorage.getItem('completedTasks') || '';
        rebindEvents();
        updateProgress();
    }

    saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const desc = descInput.value.trim();
        if (!title || !desc) return alert("Fill both fields");

        const time = new Date().toLocaleString();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${title}<br><small>${time}</small></td>
            <td>${desc}</td>
            <td><button class="delete-btn">X</button></td>
        `;

        const checkbox = row.querySelector('input');
        checkbox.addEventListener('change', () => {
            checkbox.disabled = true;
            row.classList.add('completed-row');
            completed.appendChild(row);
            updateProgress();
            saveToStorage();
        });

        const delBtn = row.querySelector('.delete-btn');
        delBtn.addEventListener('click', () => {
            row.remove();
            updateProgress();
            saveToStorage();
        });

        pending.appendChild(row);
        titleInput.value = '';
        descInput.value = '';
        updateProgress();
        saveToStorage();
    });

    restoreFromStorage();
});