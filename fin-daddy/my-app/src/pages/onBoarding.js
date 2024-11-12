import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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

  import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const steps = ['User Details', 'Personal Details', 'Employee Details', 'Other Details'];

const positionTitleOptions = [
  'Cx0', 'Executive Vice President (EVP)', 'Senior Vice President (SVP)', 'Vice President Head (VPH)',
  'Vice President (VP)', 'Assistant Vice President Head (AVPH)', 'Assistant Vice President (AVP)', 
  'Manager, Management Associate (MA)', 'Assistant Manager (AM)', 'Clerk'
];

const occupationOptions = [
  'Accountant', 'Actor/Actress', 'Architect', 'Artist', 'Chef', 'Civil Engineer',
  'Data Scientist', 'Doctor', 'Electrician', 'Engineer (Various fields)', 'Financial Analyst',
  'Graphic Designer', 'Lawyer', 'Nurse', 'Pharmacist', 'Photographer', 'Project Manager',
  'Real Estate Agent', 'Software Developer', 'Teacher/Professor', 'Waiter/Waitress', 'Researcher',
  'Sales Manager', 'Marketing Specialist', 'Human Resources Specialist', 'Public Relations Specialist',
  'Social Worker', 'Construction Worker', 'Retail Worker', 'Scientist', 'Security Guard',
  'Customer Service Representative', 'IT Specialist', 'Veterinarian', 'Transport Driver',
  'Entrepreneur', 'Journalist', 'Administrative Assistant', 'Marketing Manager', 'Event Planner',
  'Research Scientist', 'Cleaner', 'Mechanic', 'Construction Manager', 'Financial Planner',
  'Retail Manager', 'Travel Agent', 'Copywriter', 'Librarian'
];

const currentJobStatusOptions = [
  'Employed', 'Unemployed', 'Part Time'
];

const housingStatusOptions = [
  'Renting', 'Owning'
];

const OnBoarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0); // State for current step
    const [formData, setFormData] = useState({
        Id: '',
        certificateNo: '',
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
        currentJobStatus: '',
        currentHousingStatus: '',
        noOfSocialAccounts: '',
        onlinePresence:'',
        ageGroup:'',
    });

    const handleCurrentJobStatusChange = (e) => {
      setFormData({
        ...formData,
        currentJobStatus: e.target.value,
      });
    };
    
    const handleOccupationChange = (e) => {
      setFormData({
        ...formData,
        occupation: e.target.value,
      });
    };

    const handlePositionTitleChange = (e) => {
      setFormData({
        ...formData,
        positionTitle: e.target.value,
      });
    };

    const handleHousingStatusChange = (e) => {
      setFormData({
        ...formData,
        currentHousingStatus: e.target.value,
      });
    };
    
    const handleDepositCheckboxChange = (event) => {
        setFormData({
          ...formData,
            createDepositAccount: event.target.checked,
      });
    };

    const handleCheckboxChange = (event) => {

        setFormData({
          ...formData,
            workingInSingapore:event.target.checked,
      });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert Id and certificateNo to numbers
        if (name === 'Id' || name === 'officeContactNumber' || name === 'officeContactNumberExt') {
          setFormData({
              ...formData,
              [name]: Number(value),
          });
      } if (name === 'onlinePresence') { // Correct syntax here: else if
          setFormData({
              ...formData,
              [name]: parseFloat(value), // Convert to number
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
        
        const formattedData = {
        ...formData,
        Id: Number(formData.Id), // Ensure Id is converted to a number
        officeContactNumber: Number(formData.officeContactNumber), // Ensure officeContactNumber is converted to a number
        officeContactNumberExt: Number(formData.officeContactNumberExt), // Ensure officeContactNumberExt is converted to a number
    };

        // Log the form data being submitted
        console.log('Submitting data:', JSON.stringify(formattedData, null, 2));

        try {
            const response = await axios.post('https://personal-svyrscxo.outsystemscloud.com/AccountRegistration/rest/AccountRegistration/AddAccountRegistration', formattedData, {
                headers: {
                    'X-Contacts-Key': 'c48b5803-757e-414d-9106-62ab010a9c8d',
                    'Content-Type': 'application/json',
                },
            });

            console.log('Registration successful:', response.data);
            alert("Registration successful!"); // Alert user of success
            // Reset form data after successful registration
            navigate('');
            setFormData({
              Id: '' ,
        certificateNo: '' ,
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
        currentJobStatus: '',
        currentHousingStatus: '',
        noOfSocialAccounts: '',
        onlinePresence:'',
        ageGroup: '',
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
          position: 'relative'
        }} 
        className=' mt-24'
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: "bold"}} >
            Registration
          </Typography>
    
          <Stepper activeStep={currentStep} alternativeLabel sx={{ marginBottom: '20px' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} style={{ fontFamily: 'Montserrat, sans-serif'}} >{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
    
          <Box sx={{ mt: 3 }}>
            
            {currentStep === 0 && (
              <>
                <TextField
                      type="number"
                      label="ID"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      name="Id"
                      onChange={handleChange}
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontFamily: "'Montserrat', sans-serif",
                        },
                        '& .MuiInputBase-root': {
                          fontFamily: "'Montserrat', sans-serif",
                      }}}
                />
                <FormControl fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                  <InputLabel id="customer-type-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Customer Type</InputLabel>
                  <Select
                    labelId="customer-type-label"
                    id="customerType"
                    value={formData.customerType}
                    onChange={handleChange}
                    name="customerType"
                    label="Customer Type"
                  >
                    <MenuItem style={{fontFamily: "Montserrat, sans-serif"}}value="Retail">Retail</MenuItem>
                  </Select>
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      required
                          onChange={handleChange}
                          label="User ID"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          name="userNo"
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontFamily: "'Montserrat', sans-serif",
                            },
                            '& .MuiInputBase-root': {
                              fontFamily: "'Montserrat', sans-serif",
                          }}}
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
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
                      />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      required
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        onChange={handleChange}
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      required
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="passwordConfirmation"
                        onChange={handleChange}
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
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
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
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
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
                      />
                    </Grid>
                </Grid>
                <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                      <InputLabel id="age-group-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Age Range</InputLabel>
                      <Select
                        labelId="date-of-birth-label"
                        id="ageGroup"
                        value={formData.ageGroup}
                        onChange={handleChange}
                        name="ageGroup"
                        label="Age Range"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="Less than 18 years">Less than 18 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="18 - 24 years">18 - 24 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="25 - 34 years">25 - 34 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="35 - 44 years">35 - 44 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="45 - 54 years">45 - 54 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="55 - 64 years">55 - 64 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="65 - 74 years">65 - 74 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="75 years and older">75 years and older</MenuItem>
                      </Select>
                    </FormControl>
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
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
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
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
                      />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                      <InputLabel id="no-of-social-accounts-label" sx={{ fontFamily: "Montserrat, sans-serif" }}>No of Social Accounts</InputLabel>
                      <Select
                        labelId="no-of-social-accounts-label"
                        id="noOfSocialAccounts"
                        value={formData.noOfSocialAccounts}
                        onChange={handleChange}
                        name="noOfSocialAccounts"
                        label="No of Social Accounts"
                      >
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="0 - 1">0 - 1</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="2 - 3">2 - 3</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="4 - 5">4 - 5</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="6 - 7">6 - 7</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="8 - 10">8 - 10</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="11+">11+</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Box sx={{ marginBottom: '20px' }}>
                      <Typography variant="body1" style={{fontFamily: "Montserrat, sans-serif"}}>Online Presence</Typography>
                      <input
                      required
                        type="range"
                        name="onlinePresence"
                        value={formData.onlinePresence}
                        onChange={handleChange}
                        min={0}
                        max={1}
                        step={0.1}
                        style={{ width: '100%', marginTop: '10px' }}
                      />
                      <Typography variant="body2" sx={{ marginTop: '10px' }} style={{fontFamily: "Montserrat, sans-serif"}}>
                        Value: {formData.onlinePresence}
                      </Typography>
                    </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="country"
                        onChange={handleChange}
                        sx={{
                          '& .MuiInputLabel-root': {
                            fontFamily: "'Montserrat', sans-serif",
                          },
                          '& .MuiInputBase-root': {
                            fontFamily: "'Montserrat', sans-serif",
                        }}}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel id="gender-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}> Gender</InputLabel>
                      <RadioGroup
                      required
                        row
                        name="gender"
                        value={formData.gender}
                        onChange={handleGenderChange}
                        sx={{ mt: 2 }}
                      >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" sx={{
                  '& .MuiTypography-root': {fontFamily: 'Montserrat, sans-serif'}
                }}/>
                        <FormControlLabel value="Female" control={<Radio />} label="Female" sx={{
                  '& .MuiTypography-root': {fontFamily: 'Montserrat, sans-serif'}
                }}/>
                      </RadioGroup>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="state"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  
                  label="City"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="city"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Housing Status Dropdown */}
                  <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                    <InputLabel id="current-housing-status-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Current Housing Status</InputLabel>
                    <Select
                      labelId="current-housing-status-label"
                      id="currentHousingStatus"
                      value={formData.currentHousingStatus}
                      onChange={handleHousingStatusChange}
                      label="Current Housing Status"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {housingStatusOptions.map((status) => (
                        <MenuItem style={{fontFamily: "Montserrat, sans-serif"}} key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
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
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  label="Phone Country Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="phoneCountryCode"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  label="Phone Area Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="phoneAreaCode"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
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
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
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
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                </Grid>
              </>
            )}
            {currentStep === 2 && (
              <>
              <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                      <InputLabel id="occupation-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Occupation</InputLabel>
                      <Select
                        labelId="occupation-label"
                        id="occupation"
                        value={formData.occupation}
                        onChange={handleOccupationChange}
                        label="Occupation"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {occupationOptions.map((occupation) => (
                          <MenuItem key={occupation} value={occupation} sx={{ fontFamily: "Montserrat, sans-serif" }}>
                            {occupation}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                      <InputLabel id="position-title-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Position Title</InputLabel>
                      <Select
                        labelId="position-title-label"
                        id="positionTitle"
                        value={formData.positionTitle}
                        onChange={handlePositionTitleChange}
                        label="Position Title"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {positionTitleOptions.map((positionTitle) => (
                          <MenuItem key={positionTitle} value={positionTitle} sx={{ fontFamily: "Montserrat, sans-serif" }}>
                            {positionTitle}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                      <InputLabel id="annual-salary-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Annual Salary</InputLabel>
                      <Select
                        labelId="annual-salary-label"
                        id="annualSalary"
                        value={formData.salaryRange}
                        onChange={handleChange}
                        name="salaryRange"
                        label="Annual Salary"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="Less than $20,000">Less than $20,000</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$20,000 - $29,999">$20,000 - $29,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$30,000 - $39,999">$30,000 - $39,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$40,000 - $49,999">$40,000 - $49,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$50,000 - $59,999">$50,000 - $59,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$60,000 - $69,999">$60,000 - $69,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$70,000 - $79,999">$70,000 - $79,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$80,000 - $89,999">$80,000 - $89,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$90,000 - $99,999">$90,000 - $99,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="$100,000 - $109,999">$100,000 - $109,999</MenuItem>
                        <MenuItem sx={{  fontFamily: "Montserrat, sans-serif" }} value="Above $100,000">Above $100,000</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                      <InputLabel id="year-of-service-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Year of Service</InputLabel>
                      <Select
                        labelId="year-of-service-label"
                        id="yearOfService"
                        value={formData.yearOfService}
                        onChange={handleChange}
                        name="yearOfService"
                        label="Year of Service"
                        sx={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="Less than 1 year">Less than 1 year</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="1 - 2 years">1 - 2 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="3 - 4 years">3 - 4 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="5 - 6 years">5 - 6 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="7 - 8 years">7 - 8 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="9 - 10 years">9 - 10 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="11 - 12 years">11 - 12 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="13 - 14 years">13 - 14 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="15 - 16 years">15 - 16 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="17 - 18 years">17 - 18 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="19 - 20 years">19 - 20 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="21 - 22 years">21 - 22 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="23 - 24 years">23 - 24 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="25 - 26 years">25 - 26 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="27 - 28 years">27 - 28 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="29 - 30 years">29 - 30 years</MenuItem>
                        <MenuItem sx={{ fontFamily: "Montserrat, sans-serif" }} value="More than 30 years">More than 30 years</MenuItem>
                      </Select>
                    </FormControl>
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
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  
                  label="Office Address 2"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeAddress2"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                  
                  label="Office Address 3"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeAddress3"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                    required
                  type="number"
                  label="Office Contact Number Ext"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeContactNumberExt"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                    required
                  type="number"
                  label="Office Contact Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="officeContactNumber"
                  onChange={handleChange}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                    '& .MuiInputBase-root': {
                      fontFamily: "'Montserrat', sans-serif",
                  }}}
                />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                    <InputLabel id="current-job-status-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Current Job Status</InputLabel>
                    <Select
                      labelId="current-job-status-label"
                      id="currentJobStatus"
                      value={formData.currentJobStatus}
                      onChange={handleCurrentJobStatusChange}
                      label="Current Job Status"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {currentJobStatusOptions.map((status) => (
                        <MenuItem key={status} value={status} sx={{ fontFamily: "Montserrat, sans-serif" }}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            {currentStep === 3 && (
              <>
              <FormControl required fullWidth margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px' } }}>
                  <InputLabel id="currency-label" sx={{ color: '#666666', fontFamily: "Montserrat, sans-serif" }}>Currency Preferred</InputLabel>
                  <Select
                    labelId="currency-label"
                    id="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    name="currency"
                    label="Currency"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <MenuItem style={{fontFamily: "Montserrat, sans-serif"}}value="SGD">SGD</MenuItem>
                  </Select>
                </FormControl>
              <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.workingInSingapore}
                                onChange={handleCheckboxChange}
                                color="primary"
                            />
                        }
                        sx={{'& .MuiTypography-root': {fontFamily: 'Montserrat, sans-serif'}}}
                        label="Are you working in Singapore?"
                        name="workingInSingapore"
                    />
            
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                          <Checkbox
                              checked={formData.createDepositAccount}
                              onChange={handleDepositCheckboxChange}
                              color="primary"
                          />
                            }
                            label="Do you wish to create a Deposit Account?"
                            name="createDepositAccount"
                            sx={{'& .MuiTypography-root': {fontFamily: 'Montserrat, sans-serif'}}}
                        />
                    </Grid>
                </Grid>
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              {currentStep !== 0 &&(
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleBack} 
                sx={{ borderRadius: '5px' }} 
                style= {{fontFamily: 'Montserrat, sans-serif'}}
              >
                Previous
              </Button>)}
              {currentStep === 0 && (
              <Button>
                <Link to="/" style= {{fontFamily: 'Montserrat, sans-serif'}}>BACK</Link>
              </Button>
            )}
              {currentStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmit} 
                  sx={{ borderRadius: '5px' }}
                  style= {{fontFamily: 'Montserrat, sans-serif'}}
                >
                  Submit
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext} 
                  sx={{ borderRadius: '5px' }}
                  style= {{fontFamily: 'Montserrat, sans-serif'}}
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
