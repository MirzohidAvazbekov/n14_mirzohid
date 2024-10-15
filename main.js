let students = [];
let currentEditIndex = null;

window.onload = function() {
    displayStudents(); 
}

function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = ""; 
    students.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.group}</td>
                <td>${student.works ? "Yes" : "No"}</td>
                <td>${student.timeAdded || "Not available"}</td>
                <td>${student.timeEdited || "Not edited yet"}</td>
                <td>
                    <button onclick="openEditModal(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function openAddModal() {
    document.getElementById("addModal").style.display = "block";
}

function openEditModal(index) {
    currentEditIndex = index;
    const student = students[index];
    document.getElementById("editFirstName").value = student.firstName;
    document.getElementById("editLastName").value = student.lastName;
    document.getElementById("editGroup").value = student.group;
    document.getElementById("editWorks").checked = student.works;
    document.getElementById("editModal").style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function addStudent() {
    const firstName = document.getElementById("addFirstName").value;
    const lastName = document.getElementById("addLastName").value;
    const group = document.getElementById("addGroup").value;
    const works = document.getElementById("addWorks").checked;

    const timeAdded = new Date().toLocaleString(); // Track when added

    students.push({ firstName, lastName, group, works, timeAdded });
    closeModal('addModal');
    displayStudents();
}

function saveStudent() {
    const firstName = document.getElementById("editFirstName").value;
    const lastName = document.getElementById("editLastName").value;
    const group = document.getElementById("editGroup").value;
    const works = document.getElementById("editWorks").checked;

    const timeEdited = new Date().toLocaleString(); // Track when edited

    students[currentEditIndex] = { ...students[currentEditIndex], firstName, lastName, group, works, timeEdited };
    closeModal('editModal');
    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function searchStudent() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.firstName.toLowerCase().includes(searchValue) || 
        student.lastName.toLowerCase().includes(searchValue)
    );
    const table = document.getElementById("studentTable");
    table.innerHTML = "";
    filteredStudents.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.group}</td>
                <td>${student.works ? "Yes" : "No"}</td>
                <td>${student.timeAdded || "Not available"}</td>
                <td>${student.timeEdited || "Not edited yet"}</td>
                <td>
                    <button onclick="openEditModal(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}
