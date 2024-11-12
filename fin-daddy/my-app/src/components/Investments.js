import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const investments = [
  {
    id: 1,
    title: "Basic Plan - Green Bonds",
    description:
      "Invest in a stable green bond with minimal risk and steady returns. Ideal for conservative investors seeking environmental impact with low volatility.",
    riskLevel: "Low Risk",
    returns: "Low Returns",
  },
  {
    id: 2,
    title: "Intermediate Plan - Green Investment Bundle",
    description:
      "Green projects with moderate risk and return potential. Suitable for balanced investors seeking both growth and stability in eco-friendly investments.",
    riskLevel: "Medium Risk",
    returns: "Medium Returns",
  },
  {
    id: 3,
    title: "Expert Plan - Leveraged Green Growth Package",
    description:
      "Leverage green investments for potential high returns. Ideal for experienced investors willing to take on significant risk in pursuit of higher profits.",
    riskLevel: "High Risk",
    returns: "High Returns",
  },
];

const InvestmentComponent = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: "100px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Investment Plans
      </Typography>
      <Grid container spacing={4}>
        {investments.map((investment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {investment.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {investment.description}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {investment.riskLevel} - {investment.returns}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: "15px",
                    backgroundColor: "#44403c",
                    color: "white",
                  }}
                  component={Link}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  to={`/investmentForm2/${investment.id}`}
                >
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InvestmentComponent;
