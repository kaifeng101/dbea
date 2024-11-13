import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
  } from "@mui/material";
  
  // Table Component
  const InvestmentPlanTable = ({ transactionLogs }) => {
    return (
      <TableContainer component={Paper} className="p-5">
        <Typography
          variant="h6"
          sx={{ mb: 2, fontFamily: "'Montserrat', sans-serif" }}
        >
          Investment Transaction Logs
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                Time
              </TableCell>
              <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                Investment Type
              </TableCell>
              <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                Amount
              </TableCell>
              <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                Change
              </TableCell>{" "}
              {/* New column for Change */}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionLogs.length > 0 ? (
              transactionLogs.map((log, index) => {
                // Get the next transaction's amount (if it exists)
                const nextAmount =
                  index < transactionLogs.length - 1
                    ? transactionLogs[index + 1].Amount
                    : 0;
  
                const change =
                  index === transactionLogs.length - 1 // No change for the last transaction
                    ? 0
                    : nextAmount - log.Amount;
  
                // Determine if the change is positive or negative
                const changeIndicator = change > 0 ? "+" : change < 0 ? "-" : "";
                const changeFormatted = Math.abs(change).toFixed(2);
  
                return (
                  <TableRow key={log.Id}>
                    <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                      {new Date(log.DateTime).toLocaleString("en-SG", {
                        timeZone: "Asia/Singapore",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                      {new Date(log.DateTime).toLocaleString("en-SG", {
                        timeZone: "Asia/Singapore",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                      {log.Type}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Montserrat, sans-serif" }}>
                      ${log.Amount?.toFixed(2)}
                    </TableCell>{" "}
                    {/* Display current transaction amount */}
                    <TableCell
                      sx={{
                        color:
                          change > 0 ? "green" : change < 0 ? "red" : "black",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {change === 0
                        ? "-"
                        : `${changeIndicator}${changeFormatted}`}{" "}
                      {/* Display change only if not the last transaction */}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default InvestmentPlanTable;
  