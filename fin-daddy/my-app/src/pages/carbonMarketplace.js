
import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  // Badge,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Slider,
  TextField,
  Container,
  Box,
  Grid,
} from '@mui/material'
import { ShoppingCart, Info } from '@mui/icons-material'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import cleanOceanImg from '../assets/cleanOceanImg.jpg'
import renewableEnergyImg from '../assets/renewableEnergyImg.jpg'
import wildlifeConservationImg from '../assets/wildlifeConservationImg.jpg'
import urbanGreeningImg from '../assets/urbanGreeningImg.jpg'
import reforestationImg from '../assets/reforestation.png'
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

// TO DO
// Need to get customerId from session
export default function CarbonMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [minCost, setMinCost] = useState(0)
  const [maxCost, setMaxCost] = useState(20)
  const [compareList, setCompareList] = useState([])
  const [cart, setCart] = useState([])
  const [selectedOffset, setSelectedOffset] = useState(null)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isCartDialogOpen, setCartDialogOpen] = useState(false) 
  const [totalCredits, setTotalCredits] = useState(null);
  const [checkoutCartDialogOpen, setCheckoutCartDialogOpen] = useState(false);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); // For error message
  const [isSuccess, setIsSuccess] = useState(false); // For handling success message
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const user = useSelector(selectUser);
  const userID = user?.customerId

  let finalTotalCost = 0;
  let finalTotalAmtGet = 0;

 
  const fetchCarbonCredits = useCallback(async () => {
    try { 
      const response = await fetch(`https://personal-svyrscxo.outsystemscloud.com/CustomerCarbon/rest/CustomerCarbonCredit/GetCustomerCarbonCredit?CustomerId=${userID}`, {
        method: 'GET', // Default method is GET, but you can specify it explicitly
        headers: {
          'X-Contacts-Key': 'c48b5803-757e-414d-9106-62ab010a9c8d', // Add the API key here
          'Content-Type': 'application/json', // Optional, depending on API requirements
        },
      });
      const data = await response.json();
      setTotalCredits(data[0].Credits); // Assuming the response contains { totalCredits: value }
    } catch (error) {
      console.error('Error fetching carbon credits:', error);
    }
  }, [userID]);

  useEffect(() => {
    fetchCarbonCredits();
  }, [fetchCarbonCredits]);


  const carbonOffsets = [
    {
      "id": 1,
      "name": "Clean Ocean Initiative",
      "description": "Help remove plastic waste from oceans to protect marine life and reduce pollution.",
      "longDescription": "Join the fight against ocean pollution by supporting our initiative to remove plastic waste from the world's oceans. Your contribution will help fund clean-up operations in key oceanic areas, preserving marine biodiversity and promoting healthier, more sustainable ecosystems. Together, we can stop plastic waste from harming marine life and our planet.",
      "location": "Global, Oceans Worldwide",
      "receiveAmt": 25,
      "credits": 5,
      "image": cleanOceanImg,
      "tags": ["Marine Conservation", "Pollution Reduction", "Sustainability"],
      "impact": "Removes 5kg of plastic waste from the ocean per purchase",
      "verification": "Verified by Ocean Conservancy"
    },
    {
      "id": 2,
      "name": "Reforestation Project",
      "description": "Help restore forests and combat climate change by planting trees.",
      "longDescription": "Support our reforestation efforts to restore ecosystems and fight climate change. By planting native trees in areas affected by deforestation, we help reduce CO2 levels, enhance biodiversity, and provide livelihoods for local communities. Each contribution directly supports the planting of trees that will grow into long-term carbon sinks.",
      "location": "Amazon Rainforest, Brazil",
      "receiveAmt": 30,
      "credits": 3,
      "image": reforestationImg,
      "tags": ["Biodiversity", "Climate Change", "Sustainability"],
      "impact": "Plants 3 trees, sequestering 3 tons of CO2 over their lifetime",
      "verification": "Verified Carbon Standard (VCS)"
    },
    {
      "id": 3,
      "name": "Renewable Energy Fund",
      "description": "Invest in renewable energy projects to reduce carbon footprints.",
      "longDescription": "By contributing to our Renewable Energy Fund, you help accelerate the transition to clean energy. Your support will fund the construction of wind and solar farms that produce sustainable power, helping reduce global dependence on fossil fuels. Each contribution reduces greenhouse gas emissions and supports a cleaner, greener future for all.",
      "location": "Global",
      "receiveAmt": 50,
      "credits": 10,
      "image": renewableEnergyImg,
      "tags": ["Clean Energy", "Sustainability", "Green Economy"],
      "impact": "Offsets 10 tons of CO2 per year through renewable energy generation",
      "verification": "Certified by Global Wind Energy Council"
    },
    {
      "id": 4,
      "name": "Wildlife Habitat Protection",
      "description": "Protect endangered species and their habitats through conservation efforts.",
      "longDescription": "Your support helps protect endangered wildlife species and their natural habitats. By funding critical conservation initiatives, we can preserve biodiversity, prevent habitat loss, and ensure that future generations can experience the beauty of wildlife. Every dollar contributed supports on-the-ground protection efforts in areas of high ecological importance.",
      "location": "Africa, Southeast Asia, Amazon Rainforest",
      "receiveAmt": 40,
      "credits": 8,
      "image": wildlifeConservationImg,
      "tags": ["Wildlife", "Biodiversity", "Conservation"],
      "impact": "Protects 10 acres of wildlife habitat, ensuring the survival of 5 endangered species",
      "verification": "Partnered with World Wildlife Fund (WWF)"
    },
    {
      "id": 5,
      "name": "Urban Greening Initiative",
      "description": "Create green spaces in cities to improve air quality and community health.",
      "longDescription": "Help transform urban landscapes by supporting the creation of green spaces such as parks and community gardens. These green spaces not only improve air quality, but also promote mental well-being, reduce urban heat islands, and create places for local communities to connect with nature. Your support turns concrete jungles into thriving ecosystems.",
      "location": "Cities Worldwide",
      "receiveAmt": 20,
      "credits": 4,
      "image": urbanGreeningImg,
      "tags": ["Urban Sustainability", "Green Spaces", "Public Health"],
      "impact": "Establishes 500 square meters of urban park space, improving air quality for 1,000 residents",
      "verification": "Certified by Green City Coalition"
    }    
  ]

  const filteredOffsets = carbonOffsets.filter(offset => 
    offset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    offset.credits >= minCost && offset.credits <= maxCost
  )

  const handleCompare = (offset) => {
    if (compareList.find(item => item.id === offset.id)) {
      setCompareList(compareList.filter(item => item.id !== offset.id))
    } else if (compareList.length < 3) {
      setCompareList([...compareList, offset])
    }
  }

  const addToCart = (offset) => {
    setCart([...cart, offset])
  }

  // Open the cart dialog when the button is clicked
  const handleCartDialogOpen = () => {
    setCartDialogOpen(true)
  }

  // Open the detailed dialog when the Info button is clicked
  const handleDialogOpen = (offset) => {
    setSelectedOffset(offset);
    setDialogOpen(true);
  };

  const removeItem = (name) => {
    // Remove the item entirely
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  // Function to check if the total credits are enough
  const handleCheckout = () => {
    if (totalCredits < finalTotalCost) {
      // If not enough credits
      setErrorMessage('Not enough credits to complete the transaction.');
      setCheckoutCartDialogOpen(true);
    } else {
      // If enough credits, ask for confirmation
      setIsCheckoutDialogOpen(true);
    }
  };

  const confirmCheckout = async () => {
      try {
        const response = await fetch('https://personal-svyrscxo.outsystemscloud.com/CarbonTrading/rest/SellCarbon/SellCarbon?creditNeeded=' + finalTotalCost, {
            method: 'POST',
            headers: {
                'X-Contacts-Key': 'c48b5803-757e-414d-9106-62ab010a9c8d',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustomerId: userID,
                TransactionAmount: finalTotalAmtGet
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);
        
      } catch (error) {
        console.error('Error fetching carbon credits:', error);
    }

    setIsSuccess(true);
    setIsCheckoutDialogOpen(false);
    setSuccessDialogOpen(true); // Open success dialog
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false); // Close the success dialog
    setCart([]);
    setCartDialogOpen(false)

    window.location.reload();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className='mt-24'>
      <Typography variant="h4" gutterBottom>Carbon Marketplace</Typography>

      {/* Display carbon credits at the top right */}
      <Box 
        position="fixed" 
        top={70} 
        left={16} 
        bgcolor="rgba(0, 0, 0, 0.5)" 
        color="white" 
        p={2} 
        borderRadius={2}
      >
        <Typography variant="h6">Carbon Credits: {totalCredits}</Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row', alignItems: 'center' }} gap={2} mb={4}>
        <TextField
          label="Search Projects"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box>
          <Typography>Minimum CO2e: {minCost}</Typography>
          <Slider
            min={0}
            max={20}
            value={minCost}
            onChange={(e, value) => setMinCost(value)}
            aria-labelledby="min-price-slider"
          />
          <Typography>Maximum CO2e: {maxCost}</Typography>
          <Slider
            min={0}
            max={20}
            value={maxCost}
            onChange={(e, value) => setMaxCost(value)}
            aria-labelledby="max-price-slider"
          />
        </Box>
      </Box>

      {compareList.length > 0 && (
        <Box mb={4}>
          <Typography variant="h5">Compare Projects</Typography>
          <Grid container spacing={2} mt={1}>
            {compareList.map(offset => (
              <Grid item xs={12} md={4} key={offset.id}>
                <Card>
                  <CardHeader title={offset.name} subheader={offset.location} />
                  <CardContent>
                    <Typography>You will get: ${offset.receiveAmt}</Typography>
                    <Typography>Cost: {offset.credits} CO2e</Typography>
                    <Typography>Impact: {offset.impact}</Typography>
                    <Typography>Verification: {offset.verification}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Add a horizontal line */}
          <hr style={{ marginTop: '20px', border: '1px solid #ccc' }} />
        </Box>
        
      )}


      <Grid container spacing={3}>
        {filteredOffsets.map((offset) => (
          <Grid item xs={12} md={4} key={offset.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={offset.image}
                alt={offset.name}
                style={{ height: "200px" }}
              />
              <CardHeader title={offset.name} subheader={offset.location} />
              <CardContent>
                <Typography>{offset.description}</Typography>
                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                {offset.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-white"
                    style={{
                      backgroundColor: '#6B7280', // Change to desired color or set dynamically
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

                <Typography>You will get: ${offset.receiveAmt}</Typography>
                <Typography>Cost: {offset.credits} CO2e</Typography>
              </CardContent>
              <CardActions>
                <Checkbox
                  checked={compareList.some(item => item.id === offset.id)}
                  onChange={() => handleCompare(offset)}
                />
                <Typography variant="body2">Compare</Typography>
                {/* Info Icon Button */}
                <IconButton onClick={() => handleDialogOpen(offset)} color="primary">
                  <Info />
                </IconButton>
                <Button onClick={() => addToCart(offset)}>Add to Cart</Button>  {/* Remove dialog-related code */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredOffsets.length === 0 && (
        <Typography variant="h6" align="center" mt={4}>No carbon offset projects match your criteria.</Typography>
      )}

      {/* Dialog for detailed information about the selected offset */}
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <img src={selectedOffset?.image} alt={selectedOffset?.name} className="w-full h-64 object-cover rounded-lg" />
        <DialogTitle>{selectedOffset?.name}</DialogTitle>
        <DialogContent dividers>
          <Typography>{selectedOffset?.longDescription}</Typography>
          <Box mt={2}>
            <Typography>Impact: {selectedOffset?.impact}</Typography>
            <Typography>Verification: {selectedOffset?.verification}</Typography>
            <Typography>You will get: ${selectedOffset?.receiveAmt} per credit</Typography>
            <Typography>Cost: {selectedOffset?.credits} tons CO2e</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Cart Dialog */}
      <Dialog open={isCartDialogOpen} onClose={() => setCartDialogOpen(false)}>
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent dividers>
          {cart.length === 0 ? (
            <Typography variant="body1">Your cart is empty.</Typography>
          ) : (
            <>
              <Box mt={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><strong>Item</strong></TableCell>
                      <TableCell align="center"><strong>Quantity</strong></TableCell>
                      <TableCell align="center"><strong>Amt Earned</strong></TableCell>
                      <TableCell align="center"><strong>Cost (CO2e)</strong></TableCell>
                      <TableCell align="center"><strong>Total Cost</strong></TableCell>
                      <TableCell align="center"><strong>Total You Will Get</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(
                      cart.reduce((acc, item) => {
                        acc[item.name] = acc[item.name] ? acc[item.name] + 1 : 1;
                        return acc;
                      }, {})
                    ).map(([name, quantity], index) => {
                      const item = cart.find(item => item.name === name);
                      if (!item) return null;  // If item not found, skip it
              
                      const totalAmtGet = item.receiveAmt * quantity;
                      const totalCost = item.credits * quantity;

                      finalTotalCost += totalCost
                      finalTotalAmtGet += totalAmtGet

                      return (
                        <TableRow key={index}>
                          <TableCell>{name}</TableCell>
                          <TableCell align="center">{quantity}</TableCell>
                          <TableCell align="center">${item.receiveAmt}</TableCell>
                          <TableCell align="center">{item.credits} CO2e</TableCell>
                          <TableCell align="center">{totalCost.toFixed(2)}</TableCell> {/* Total cost */}
                          <TableCell align="center">${totalAmtGet.toFixed(2)}</TableCell> {/* Total you will get */}
                          {/* Add a button to decrease quantity, with the icon centered */}
                          <TableCell>
                            <IconButton onClick={() => removeItem(item.name)} color="primary" style={{ display: 'flex', justifyContent: 'center' }}>
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {/* Add total row for costs and prices */}
                    <TableRow>
                      <TableCell colSpan={4} align="right"><strong>Total:</strong></TableCell>
                      <TableCell align="center">{finalTotalCost.toFixed(2)}</TableCell>
                      <TableCell align="center">${finalTotalAmtGet.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>

            </>
          )}
        </DialogContent>
        <DialogActions>
        {cart.length > 0 ? (
          <Button style={{ color: "red" }} onClick={handleCheckout}>Checkout</Button>
          ) : null }
          <Button onClick={() => setCartDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to show error or success */}
      <Dialog open={checkoutCartDialogOpen} onClose={() => setCheckoutCartDialogOpen(false)}>
        <DialogTitle>{isSuccess ? 'Success' : 'Error'}</DialogTitle>
        <DialogContent>
          <p>{isSuccess ? 'Transaction completed successfully!' : errorMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutCartDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Checkout Confirmation Dialog */}
      <Dialog open={isCheckoutDialogOpen} onClose={() => setIsCheckoutDialogOpen(false)}>
        <DialogTitle>Checkout Confirmation</DialogTitle>
        <DialogContent>
          <Typography>You have enough credits to complete the transaction. Do you want to proceed?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCheckoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmCheckout} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Checkout Successful!</DialogTitle>
        <DialogContent>
          <Typography>Your checkout was completed successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog}>Close</Button>
        </DialogActions>
      </Dialog>



      <Box position="fixed" bottom={16} right={16}>
        <Button variant="contained" color="primary" startIcon={<ShoppingCart />} onClick={handleCartDialogOpen}>
          Cart ({cart.length})
        </Button>
      </Box>
    </Container>
  )
}