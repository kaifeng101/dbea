import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    RadioGroup,
    Checkbox,
    FormControlLabel,
    Radio,
    Grid
  } from '@mui/material';

const steps = ['User Details', 'Personal Details', 'Employee Details', 'Other Details'];

const OnBoarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // State for current step
    const [formData, setFormData] = useState({
        Id: 0,
        certificateNo: 0,
        userNo: '',
        emailAddress: '',
        customerType: '',
        familyName: '',
        givenName: '',
        dateOfBirth: '',
        gender: '',
        occupation: '',
        streetAddress1: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        phoneCountryCode:'',
        phoneAreaCode: '',
        phoneLocalNumber: '',
        mobileNumber: '',
        positionTitle: '',
        yearOfService: '',
        employerName: '',
        salaryRange: '',
        officeAddress1: '',
        officeAddress2: '',
        officeAddress3: '',
        officeContactNumber: '',
        officeContactNumberExt: '',
        currency: '',
        workingInSingapore: '',
        createDepositAccount: '',
        password: '',
        passwordConfirmation: '',
    });
    const [isWorkingInSingapore, setIsWorkingInSingapore] = useState(false);
    const [wantsDepositAccount, setWantsDepositAccount] = useState(false);

    const handleDepositCheckboxChange = (event) => {
        setWantsDepositAccount(event.target.checked);
    };

    const handleCheckboxChange = (event) => {
        setIsWorkingInSingapore(event.target.checked);
    };

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

        const dateOfBirth = new Date(formData.dateOfBirth);

        // Check if dateOfBirth is valid
        if (isNaN(dateOfBirth.getTime())) {
            console.error("Invalid date format for dateOfBirth:", formData.dateOfBirth);
            return;
        }

        // Format the date as YYYY-MM-DD
        const formattedDate = dateOfBirth.toISOString().split('T')[0];
        
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
            navigate('localhost:3000');
            setFormData({
              Id: 0,
              certificateNo: 0,
              userNo: '',
              emailAddress: '',
              customerType: '',
              familyName: '',
              givenName: '',
              dateOfBirth: '',
              gender: '',
              occupation: '',
              streetAddress1: '',
              city: '',
              state: '',
              country: '',
              postalCode: '',
              phoneCountryCode:'',
              phoneAreaCode: '',
              phoneLocalNumber: '',
              mobileNumber: '',
              positionTitle: '',
              yearOfService: '',
              employerName: '',
              salaryRange: '',
              officeAddress1: '',
              officeAddress2: '',
              officeAddress3: '',
              officeContactNumber: '',
              officeContactNumberExt: '',
              currency: '',
              workingInSingapore: '',
              createDepositAccount: '',
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
              <label>Id:</label>
              <input type="number" name="Id" onChange={handleChange} required />
                <TextField
                    required
                    label="Customer Type"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="customerType"
                    InputLabelProps={{
                        sx: { color: '#666666' },
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                          required
                          label="User ID"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          name="userNo"
                          InputLabelProps={{
                              sx: { color: '#666666' },
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="emailAddress"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="passwordConfirmation"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                </Grid>
              </>
            )}
            {currentStep === 1 && (
              <>
              <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Certificate ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="certificateNo"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="dateOfBirth"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Family Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="familyName"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Given Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="givenName"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Country"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="country"
                        onChange={handleChange}
                        InputLabelProps={{
                          sx: { color: '#666666' },
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="State"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="state"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="City"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="city"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Street Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="streetAddress1"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Postal Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="postalCode"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Phone Country Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="phoneCountryCode"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Phone Area Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="phoneAreaCode"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="mobileNumber"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Phone Local Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="phoneLocalNumber"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
              </>
            )}
            {currentStep === 2 && (
              <>
              <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Occupation"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="occupation"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Title of Position"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="positionTitle"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Employer Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="employerName"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Annual Salary"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="salaryRange"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Year Started Service"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="yearOfService"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Office Address 1"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeAddress1"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Office Address 2"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeAddress2"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Office Address 3"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeAddress3"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Office Contact Number Ext"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeContactNumberExt"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  required
                  label="Office Contact Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeContactNumber"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
                    </Grid>
                </Grid>
              </>
            )}
            {currentStep === 3 && (
              <>
                <TextField
                  label="Currency Preferred"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="currency"
                  onChange={handleChange}
                  InputLabelProps={{
                    sx: { color: '#666666' },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' }}}
                />
              <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isWorkingInSingapore}
                                onChange={handleCheckboxChange}
                                color="primary"
                            />
                        }
                        label="Are you working in Singapore?"
                        name="workingInSingapore"
                        sx={{ color: '#666666' }} // Optional styling for the label
                    />
            
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                          <Checkbox
                              checked={wantsDepositAccount}
                              onChange={handleDepositCheckboxChange}
                              color="primary"
                          />
                            }
                            label="Do you wish to create a Deposit Account?"
                            name="createDepositAccount"
                            sx={{ color: '#666666' }} // Optional styling for the label
                        />
                    </Grid>
                </Grid>
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
