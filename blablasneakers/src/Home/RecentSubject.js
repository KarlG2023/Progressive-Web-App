import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

export default function RecentSubject(props) {

  const [selectedRow, setSelectedRow] = React.useState({});
  // const [data, setData] = React.useState([]);
  const data = props.data;
  const allRow = React.useRef([]);
  var propertyValues = props.currentValue;


 
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const response = await getSubjects();
  //     console.log("response", response);
  //     data.current = [response];
  //     console.log("typeof data", data.current[0]);
  //   };
  //   getData();
  // }, [])

  const readUserData = () => {
    console.log('start');
    console.log("data.current", data.current);
    // var propertyValues = [];

    // if (data.current[0]) {
      // propertyValues = Object.values(data.current[0]);//convertie mon object data en array
      // console.log("propertyValues", propertyValues[0]);//print tout l'object subjects
      console.log("propertyValues, lenght", propertyValues.length);
      for (let index = 0; index < propertyValues.length; index++) {
        console.log(propertyValues[index].data[0]);//print tout mes titres sujets directement
        // console.log(propertyValues[index].data[0][0]);//print tout mes titres sujets directement
        // console.log(propertyValues[index].data[0][1]);//print tout mes uuid sujets directement
        // console.log(propertyValues[index].data[0][2]);//print tout mes timestamp sujets directement

        if (!allRow.current.includes(propertyValues[index].data[0]))
          allRow.current.push(propertyValues[index].data[0]);

        // if (propertyValues[index].data[0][0])
        //   allTitle.current.push(propertyValues[index].data[0][0]);
        // if (propertyValues[index].data[0][1])
        //   allUuid.current.push(propertyValues[index].data[0][1]);
        // if (propertyValues[index].data[0][2])
        //   allTimestamp.current.push(propertyValues[index].data[0][2]);
      }
    // }
    // console.log("propertyValues", propertyValues[1].data);

    // for (let index = 0; index <  data.current.length; index++) {
    //   console.log      
    // }
    // propertyValues.forEach((id) => {
    //   console.log("id.data", id.data);
    //   console.log("id", id);
    //   getSubject(id.data[0]);
    // })
    // await get(ref(db, `subjects/30b766939a3`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log("Titres sujet 1", snapshot.val().data[0][0]);
    //       console.log("Titres sujet 2", snapshot.val().data[0][1]);
    //       console.log("Titres sujet 2", snapshot.val().data[0][2]);
    //       // snapshot.forEach(element => {
    //       //   allTitle.current.push(element.val().data[0][0]);
    //       // });
    //       for (let index = 0; index < snapshot.length; index++) {
    //         const element = snapshot.val()[index][index];
    //         console.log("element", element);
    //       }
    //       // allTitle.current.push("title", snapshot.val().data[0][0]);
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // console.log("allTitle.current", allTitle.current);
  }

  React.useEffect(() => {
    readUserData();
    // refresh = false;
  })

  React.useEffect(() => {
    console.log("selectedRow", selectedRow);
  }, [selectedRow])

  return (
    <React.Fragment>
      <Title>Sujets récents</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sujet</TableCell>
            <TableCell>Auteur</TableCell>
            <TableCell>Creation du sujet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.id} onClick={() => setSelectedRow(row)}>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))} */}

          {allRow.current.map((sujet) => (
            <TableRow key={sujet} onClick={() => setSelectedRow(sujet)}>
              <TableCell>{sujet[0]}</TableCell>
              <TableCell>{sujet[1]}</TableCell>
              <TableCell>{sujet[2]}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3, alignSelf: 'center' }}>
        Voir plus de sujets
      </Link> */}
    </React.Fragment>
  );
}