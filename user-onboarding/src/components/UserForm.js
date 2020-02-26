// Packages
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'


const UserForm = ({ touched, errors, status, ...props }) => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        status && setUsers([...users, status])
    }, [status])


    return (
        <div>
            <Form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Field type="text" name="name" placeholder="Your name" className="form-control" />
                    {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Field type="email" name="email" placeholder="Your email address" className="form-control" />
                    {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <Field type="password" name="password" placeholder="Your password" className="form-control" />
                    {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}
                </div>

                <div className="form-check">
                    <p>
                        <Field type="checkbox" id="tos" name="tos" className="form-check-input" />
                        <label htmlFor="tos" className="form-check-label">
                            Terms of Service
                        </label>
                        {touched.tos && errors.tos && (<p className='errors'>{errors.tos}</p>)}
                    </p>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </Form>
            <br />
            <hr />
            <br />
            <h1>New Users</h1>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID #</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
    
export default withFormik({
    mapPropsToValues: ({name, email, password, tos}) => ({
        name: name || '',
        email: email || '',
        password: password || '',
        tos: tos || false
    }),
    validationSchema: yup.object().shape({
        name: yup
            .string()
            .required('A name is required.'),
        email: yup
            .string()
            .required('An email is required.'),
        password: yup
            .string()
            .required('A password is required.'),
        tos: yup
            .boolean()
            .oneOf([true], 'You must get agree to the Terms of Service'),
    }),
    handleSubmit: (values, { resetForm, setStatus }) => {
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                setStatus(res.data)
                resetForm()
        })
        .catch(err => console.log(err.res))
    }
})(UserForm)