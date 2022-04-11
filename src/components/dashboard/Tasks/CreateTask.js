// import { useState } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../../actions/authActions";
// import axios from "axios";

// function CreateTodo() {
//     const [data, setData] = useState({ title: "", class: "", duedate: "" });
//     const { user } = this.props.auth;

// function handleChange(e) {
//     e.persist();
//     setData((data) => ({ ...data, [e.target.name]: e.target.value }));
// }

// function handleSubmit(e) {
//     e.preventDefault();

//     axios
//         .post("http://localhost:5000/api/tasks", data)
//         .then((res) => {
//             setData({ title: "", class: "" });
//             console.log(res.data.message);
//         })
//         .catch((err) => {
//             console.log("Error couldn't create TODO");
//             console.log(err.message);
//         });
// }

//     return (
// <section className="container">
//     <Link to="/tasks">
//         <button type="button" className="button button-back">
//             {user.name}
//         </button>
//     </Link>

//     <section className="contents">
//         <form onSubmit={handleSubmit} className="form-container" noValidate>
//             <label className="label" htmlFor="title">
//                 Task Title
//             </label>
//             <input type="text" name="title" value={data.title} onChange={handleChange} className="input" />
//             <label className="label" htmlFor="class">
//                 Class
//             </label>
//             <input type="text" name="class" value={data.class} onChange={handleChange} className="input" />
//             <label className="label" htmlFor="duedate">
//                 Due Date
//             </label>
//             <input type="date" name="duedate" value={data.duedate} onChange={handleChange} className="input" />
//             <button type="submit" className="button">
//                 create todo
//             </button>
//         </form>
//     </section>
// </section>
//     );
// }

// CreateTodo.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//     auth: state.auth,
// });

// export default connect(mapStateToProps, { logoutUser })(CreateTodo);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import axios from "axios";

class CreateTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: "",
                class: "",
                duedate: "",
            },
            userData: this.props.auth,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        e.persist();
        let data = this.state.data;
        data = { ...data, [e.target.name]: e.target.value };
        this.setState({ data: data });
        console.log(this.state.userData);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.state.data;

        axios
            .post("http://localhost:5000/api/tasks", data)
            .then((res) => {
                let data = {
                    title: "",
                    class: "",
                    duedate: "",
                };
                this.setState({ data: data });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create TODO");
                console.log(err.message);
            });
    };
    render() {
        const { user } = this.props.auth;
        return (
            <section className="container">
                <Link to="/tasks">
                    <button type="button" className="button button-back">
                        {user.name}
                    </button>
                </Link>

                <section className="contents">
                    <form onSubmit={this.handleSubmit} className="form-container" noValidate>
                        <label className="label" htmlFor="title">
                            Task Title
                        </label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className="input" />
                        <label className="label" htmlFor="class">
                            Class
                        </label>
                        <input type="text" name="class" value={this.state.class} onChange={this.handleChange} className="input" />
                        <label className="label" htmlFor="duedate">
                            Due Date
                        </label>
                        <input type="date" name="duedate" value={this.state.duedate} onChange={this.handleChange} className="input" />
                        <button type="submit" className="button">
                            create todo
                        </button>
                    </form>
                </section>
            </section>
        );
    }
}

CreateTodo.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(CreateTodo);
