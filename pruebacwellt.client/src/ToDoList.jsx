import React, { useEffect, useState } from 'react';
function ToDoList() {

    const [Taskms, setTaskms] = useState([]);
    const [newTaskm, setNewTaskm] = useState("");
    const [newtaskmDesc, setNewTaskmDesc] = useState("");
    const [newtaskmCheck, setNewTaskmCheck] = useState(false);

    function handleInputChange(event) {
        setNewTaskm(event.target.value)
    }
    function handleDescChange(event) {
        setNewTaskmDesc(event.target.value)
    }
    function handleCheckChange(event) {
        setNewTaskmCheck(event.target.checked)
    }
    function addTaskm() {
        AddTasks();
        window.location.reload();
    }
    function deleteTaskm(index) {
        DeleteTasks(index);
    }
    function editTaskm(index) {
        EditTasks(index);
        window.location.reload();
    }

    useEffect(() => {
        populateTasks();
    }, []);

    return (

        <div className="to-do-list">

            <h1>To-Do List</h1>
            <div>
                <input className="InputText" type="text" placeholder="Nombre Nueva Tarea" value={newTaskm} onChange={handleInputChange}></input>
                <input className="InputText" type="text" placeholder="Descripción Nueva Tarea" value={newtaskmDesc} onChange={handleDescChange}></input>
                <input className="InputCheck" type="checkbox" value={newtaskmCheck} onChange={handleCheckChange}></input>
                
                <button className="add-button" onClick={addTaskm}>Crear</button>
            </div>

            <div className="divider">
            </div>


            <ul>
                <li className="li-guia">
                    <span className="text-top">Titulo</span>
                    <span className="desc-top">Descripción</span>
                    <span className="check-top">Completado</span>
                </li>
            </ul>

            <ol>
                {Taskms.map((Taskmtmp) =>
                    <li className="li-todo" key={Taskmtmp.id}>
                        <span className="text-todo">{Taskmtmp.title}</span>
                        <span className="desc-todo">{Taskmtmp.description}</span>
                        <span className="check-todo">{showTrueFalse(Taskmtmp.isCompleted)}</span>
                        <button className="delete-button" onClick={() => { deleteTaskm(Taskmtmp.id) }}>🗑️</button>
                        <button className="edit-button" onClick={() => { editTaskm(Taskmtmp.id) }}>✏️</button>
                    </li>
                )}
            </ol>
            
        </div>

    );

    async function populateTasks() {
        const response = await fetch('api/taskm');
        if (response.ok) {
            const data = await response.json();
            setTaskms(data);
        }
    }

    async function EditTasks(index) {

        var Title = newTaskm;
        var Description = newtaskmDesc;

        const response = await fetch('api/taskm/' + index);
        const data = await response.json();

        console.log(data);

        if (Title == "") {
            Title = data.title;
        }
        if (Description == "") {
            Description = data.description;
        }

        var Checked = newtaskmCheck;

        var DateActual = new Date();

        let Taskm = {
            taskm: [{
                id: index,
                title: Title,
                description: Description,
                isCompleted: Checked,
                createdAt: DateActual
            }],
            Title: Title,
            Description: Description,
            isCompleted: Checked,
            createdAt: DateActual,
            id: index
        };

        console.log(Taskm);

        await fetch('api/taskm/' + index, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(Taskm)
        }).then(r => r.json()).then(res => {
            if (res) {
                this.setState({ message: 'New Task Created Successfully' });
            }
        });

    }

    async function AddTasks() {
        var Title = newTaskm;
        var Description = newtaskmDesc;
        var Checked = newtaskmCheck;

        var DateActual = new Date();

        let Taskm = {
            taskm: [{
                id: 0,
                title: Title,
                description: Description,
                isCompleted: Checked,
                createdAt: DateActual
            }],
            Title: Title,
            Description: Description,
            isCompleted: Checked,
            createdAt: DateActual
        };
        
        console.log(Taskm);

        await fetch('api/taskm', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(Taskm)
        }).then(r => r.json()).then(res => {
            if (res) {
                this.setState({ message: 'New Task Created Successfully' });
            }
        });

    }

    async function DeleteTasks(index) {

        const response = await fetch('api/taskm/' + index, {
            method: "DELETE",
            headers: { 'accept': 'text/plain' }
        });
        if (response.ok) {
            window.location.reload();
        }
    }

    function showTrueFalse(trueFalse) {
        if (trueFalse == true) {
            return "✔️";
        } else {
            return "❌";
        }
    }

}

export default ToDoList