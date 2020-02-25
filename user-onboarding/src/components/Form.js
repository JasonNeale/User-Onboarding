import React, { useState, useEffect } from "react"
import axios from "axios"

import { withFormik, Form, Field } from "formik"
import * as yup from "yup"

const UserForm = ({ touched, errors, status }) => {
    const [animal, setAnimal] = useState({})

    useEffect(() => {
        status && setAnimal(status)
    }, [status])
    
    return (
        <div className="">
            <Form>
                <label>
                    Species:
                    <Field type="text" name="species" placeholder="species" />
                    {touched.species && errors.species && (
                        <p className="errors">{errors.species}</p>
                    )}
                </label>
                <label>
                    Size:
                    <Field type="text" name="size" placeholder="size" />
                </label>
                <label>
                    Size:
                    <Field component="select" className="food-select" name="diet">
                        <option>Choose an Option</option>
                        <option value="herbivore">Herbivore</option>
                        <option value="carnivore">Carnivore</option>
                        <option value="omnivore">Omnivore</option>
                    </Field>
                </label>
                <label className="checkbox-container">
                    vaccinations
                    <Field type="checkbox" name="vaccinations" />
                    <span className="checkmark" />
                </label>
                <label>
                    Notes:
                    <Field as="textarea" type="text" name="notes" placeholder="Notes" />
                </label>
                <button>Anything!</button>
            </Form>
            {animal.species && (
                <ul key={animal.id}>
                    <li>Species: {animal.species}</li>
                    <li>Size: {animal.size}</li>
                    <li>Food: {animal.food}</li>
                </ul>
            )}
        </div>
    )
}
    
export default withFormik({
    mapPropsToValues: props => ({
        species: props.species || "",
        size: "",
        diet: "",
        vaccinations: false,
        notes: ""
    }),
    validationSchema: yup.object().shape({
        species: yup
            .string()
            .required("This is the species field and it is required!")
    }),
    handleSubmit: (values, { resetForm, setStatus }) => {
        // console.log("Submitting!", formikBag)
        // POST body === {}
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
            console.log(response)
            setStatus(response.data)
            resetForm()
        })
        .catch(err => console.log(err.response))
    }
})(UserForm)