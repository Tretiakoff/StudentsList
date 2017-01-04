import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Students } from '../api/students.js';

import Student from './Student.jsx';

class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Students.insert({
            text,
            createdAt: new Date(),
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderStudents() {
        return this.props.students.map((student) => (
            <Student key={student._id} student={student} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Students List</h1>

                    <form className="new-student" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Ajouter des étudiants"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderStudents()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    students: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        students: Students.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, App);