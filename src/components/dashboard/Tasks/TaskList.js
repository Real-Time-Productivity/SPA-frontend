import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTask } from "./UpdateTask";
import PNavBar from "../../private-layout/PNavBar"

function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, classTitle } = data;

    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{classTitle}</p>
            </div>

            <div className="button-container">
                <button className="button" name={_id} onClick={handleEdit}>
                    edit
                </button>
                <button className="button" name={_id} onClick={handleDelete}>
                    delete
                </button>
            </div>
        </li>
    );
}

export default function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(
        function () {
            axios
                .get("http://localhost:5000/api/tasks")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

    function handleEdit(e) {
        setId(e.target.name);
        setOpen(true);
    }

    function handleUpdate() {
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) {
        axios.delete(`http://localhost:5000/api/tasks/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() {
        setId("");
        setOpen(false);
    }

    return (
        <>
            <PNavBar />
            <Link to="/create-todo" className="button-new">
                <button className="button">New</button>
            </Link>
            <section className="contents">
                <h1>TODO</h1>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))}
                </ul>
            </section>
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTask _id={id} handleClose={handleClose} handleUpdate={handleUpdate} />
                    </div>
                </section>
            ) : (
                ""
            )}
        </>
    );
}
