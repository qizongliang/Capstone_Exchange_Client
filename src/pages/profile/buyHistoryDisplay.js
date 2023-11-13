import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'

function buyHistorydisplay(userBuyHistory) {
  userBuyHistory.map((order, orderIndex) => {
    console.log(order.orderdate)
    return (
      <>
        <Typography variant="h3" align="center">
          ORDER {orderIndex + 1}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderItems.map((item, itemIndex) => (
                <TableRow>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="right">{item.amount}</TableCell>
                  <TableCell align="right">
                    {item.price['$numberDecimal']}
                  </TableCell>
                  <TableCell align="right">
                    {item.price['$numberDecimal'] * item.amount}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Date</TableCell>
                <TableCell align="right">{order.orderdate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">
                  {order.ordertotal['$numberDecimal']}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  })
}

export default buyHistorydisplay
