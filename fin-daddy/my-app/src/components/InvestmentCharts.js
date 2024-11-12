import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const lowRiskData = [
  { year: "2019", risk: 1, return: 8 },
  { year: "2020", risk: 1.5, return: 10 },
  { year: "2021", risk: 2, return: 11 },
  { year: "2022", risk: 2.2, return: 9 },
  { year: "2023", risk: 2.5, return: 6 },
];

const mediumRiskData = [
  { year: "2019", risk: 5, return: 13 },
  { year: "2020", risk: 5.5, return: 12 },
  { year: "2021", risk: 6, return: 11 },
  { year: "2022", risk: 6.5, return: 16 },
  { year: "2023", risk: 7, return: 9 },
];

const highRiskData = [
  { year: "2019", risk: 10, return: 20 },
  { year: "2020", risk: 11, return: 26 },
  { year: "2021", risk: 12, return: 17 },
  { year: "2022", risk: 13, return: 20 },
  { year: "2023", risk: 15, return: 21 },
];

export const getLowRiskChart = () => {
  return (
    <div style={{ flex: "1 1 48%" }}>
      <Card variant="outlined">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Basic Plan - Green Bonds
        </Typography>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lowRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }} />
              <YAxis  tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Tooltip contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Legend wrapperStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2c7a7b"
                strokeWidth={3}
                name="Risk (%)"
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#2b6cb0"
                strokeWidth={3}
                name="Return (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export const getMediumRiskChart = () => {
  return (
    <div style={{ flex: "1 1 48%" }}>
      <Card variant="outlined">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Intermediate Plan - Green Investment Bundle
        </Typography>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mediumRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <YAxis tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Tooltip contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Legend wrapperStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2c7a7b"
                strokeWidth={3}
                name="Risk (%)"
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#2b6cb0"
                strokeWidth={3}
                name="Return (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
export const getHighRiskChart = () => {
  return (
    <div style={{ flex: "1 1 48%" }}>
      <Card variant="outlined" sx={{ padding: "3px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Expert Plan - Leveraged Green Growth Package
        </Typography>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={highRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <YAxis tick={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Tooltip contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Legend wrapperStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12 }}/>
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2c7a7b"
                strokeWidth={3}
                name="Risk (%)"
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#2b6cb0"
                strokeWidth={3}
                name="Return (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

