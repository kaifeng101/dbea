import React, { useState } from "react";
import axios from 'axios';

const OnBoarding = () => {
    const [formData, setFormData] = useState({
        Id: 0,
        certificateNo: 0,
        familyName: '',
        givenName: '',
        dateOfBirth: '',
        gender: '',
        occupation: '',
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        emailAddress: '',
        mobileNumber: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert Id and certificateNo to numbers
        if (name === 'Id' || name === 'certificateNo') {
            setFormData({
                ...formData,
                [name]: Number(value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value.trim(), // Trim whitespace from other input values
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for required fields
        if (!formData.certificateNo || !formData.dateOfBirth || !formData.emailAddress || !formData.password || !formData.passwordConfirmation) {
            console.error("Please fill in all required fields.");
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.passwordConfirmation) {
            console.error("Passwords do not match.");
            return;
        }

        // Ensure dateOfBirth is in the correct format (YYYY-MM-DD)
        const formattedDate = new Date(formData.dateOfBirth).toISOString().split('T')[0];
        const formattedData = {
            ...formData,
            dateOfBirth: formattedDate,
        };

        // Log the form data being submitted
        console.log('Submitting data:', JSON.stringify(formattedData, null, 2));

        try {
            const response = await axios.post('https://personal-ktq1wi49.outsystemscloud.com/IS444Account/rest/AccountRegistration/AddAccountRegistration', formattedData, {
                headers: {
                    'X-Contacts-Key': 'c48b5803-757e-414d-9106-62ab010a9c8d',
                    'Content-Type': 'application/json',
                },
            });

            console.log('Registration successful:', response.data);
            alert("Registration successful!"); // Alert user of success
            // Reset form data after successful registration
            setFormData({
                Id: 0,
                certificateNo: 0,
                familyName: '',
                givenName: '',
                dateOfBirth: '',
                gender: '',
                occupation: '',
                streetAddress1: '',
                streetAddress2: '',
                city: '',
                state: '',
                country: '',
                postalCode: '',
                emailAddress: '',
                mobileNumber: '',
                password: '',
                passwordConfirmation: '',
            });
        } catch (error) {
            // Log the full error response for debugging
            console.error('Error registering:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Id:</label>
                <input type="number" name="Id" onChange={handleChange} required />
            </div>
            <div>
                <label>Certificate No:</label>
                <input type="number" name="certificateNo" onChange={handleChange} required />
            </div>
            <div>
                <label>Family Name:</label>
                <input type="text" name="familyName" onChange={handleChange} />
            </div>
            <div>
                <label>Given Name:</label>
                <input type="text" name="givenName" onChange={handleChange} />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" onChange={handleChange} required />
            </div>
            <div>
                <label>Gender:</label>
                <input type="text" name="gender" onChange={handleChange} />
            </div>
            <div>
                <label>Occupation:</label>
                <input type="text" name="occupation" onChange={handleChange} />
            </div>
            <div>
                <label>Email Address:</label>
                <input type="email" name="emailAddress" onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" name="passwordConfirmation" onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default OnBoarding;
