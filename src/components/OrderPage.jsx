import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const OrderPage = ({ cart }) => {
  const subTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const columns = [
    { id: "title", label: "Product Name", align: "left", minWidth: 300 },
    {
      id: "itemCount",
      label: "Quantity",
      minWidth: 80,
      align: "right",
      format: (value) => value,
    },
    {
      id: "price",
      label: "Unit",
      minWidth: 80,
      align: "right",
      format: (value) => `₱ ${parseFloat(value).toFixed(2)}`,
    },
    {
      id: "totalPrice",
      label: "Price",
      minWidth: 100,
      align: "right",
      format: (value) => `₱ ${parseFloat(value).toFixed(2)}`,
    },
  ];

  const rows = cart.filter((item) => item.itemCount > 0);

  return (
    <>
      <div className="row d-flex flex-row justify-content-center align-items-center mt-3 ">
        <Paper sx={{ width: "70%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={3}
                    style={{ fontWeight: "bolder" }}
                  >
                    Details
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    style={{ fontWeight: "bolder" }}
                  >
                    Price
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        top: 57,
                        minWidth: column.minWidth,
                        fontWeight: "bolder",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={2} style={{ fontSize: "20px" }}>
                    Subtotal
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "20px" }}>
                    {`₱ ${parseFloat(subTotal).toFixed(2)}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default OrderPage;
