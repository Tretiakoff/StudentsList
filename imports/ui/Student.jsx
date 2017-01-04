import React, { Component, PropTypes } from 'react';

export default class Student extends Component {
    render() {
        return (
            <li>{this.props.student.text}</li>
        );
    }
}

Student.propTypes = {
    student: PropTypes.object.isRequired,
};
