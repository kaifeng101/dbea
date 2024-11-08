import axios from 'axios';
import React, {useState} from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Container,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
  } from '@mui/material';

const steps = ['User Details', 'Personal Details', 'Employee Details', 'Other Details'];

const OnBoarding = () => {
    const [currentStep, setCurrentStep] = useState(0); // State for current step
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

    // Handle the click of the "Next" button
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Handle the click of the "Previous" button
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleGenderChange = (e) => {
        setFormData({
            ...formData,
            gender: e.target.value,
        });
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
        <Container sx={{ 
          backgroundColor: '#ffffff', 
          padding: '40px', 
          borderRadius: '10px', 
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
          marginTop: '20px',
          position: 'relative'
        }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Registration
          </Typography>
    
          <Stepper activeStep={currentStep} alternativeLabel sx={{ marginBottom: '20px' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
    
          <Box sx={{ mt: 3 }}>
            {currentStep === 0 && (
              <>
                <TextField
                  required
                  label="Customer Type"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="User ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <TextField
                  required
                  label="Certificate ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Family Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Given Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Country"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleGenderChange}
                  sx={{ mt: 2 }}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
                <TextField
                  required
                  label="State"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="City"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Street Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Postal Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Phone Country Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Phone Area Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Phone Local Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <TextField
                  required
                  label="Occupation"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Title of Position"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Employer Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Annual Salary"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Year Started Service"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Office Address 1"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Office Address 2"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Office Address 3"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Office Contact Number Ext"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  required
                  label="Office Contact Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
              </>
            )}
            {currentStep === 3 && (
              <>
                <TextField
                  label="Currency Preferred"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  label="Are you working in Singapore?"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <TextField
                  label="Do you wish to create a Deposit Account?"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name=""
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleBack} 
                sx={{ borderRadius: '5px' }} 
                disabled={currentStep === 0} // Disable if on the first step
              >
                Previous
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmit} 
                  sx={{ borderRadius: '5px' }}
                >
                  Submit
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext} 
                  sx={{ borderRadius: '5px' }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Container>
    );
};

export default OnBoarding;
