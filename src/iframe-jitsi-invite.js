import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 505,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "10px auto",
  },
});

const Iframejitsiinvite = () => {
  const history = useHistory();

  const [meet, setMeet] = useState();
  const [meeturl, setMeetUrl] = useState(false);
  const [name, setname] = useState(false);

  const classes = useStyles();

  const createMeetName = (e) => {
    setMeet(e.target.value);
  };

  const createName = (e) => {
    setname(e.target.value);
  };

  const meetId = async () => {
    setMeetUrl(true);
    if (meet && name) {
        let data = {
            receiverMail:name,
            link:`http://localhost:3000/pheonix/${meet}`
          }
      
          const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,
            url:"http://localhost:9000/api/mail/",
          }; 
      
          await axios(options)
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
      <Typography style={{display:'flex',justifyContent: 'center',alignItems: 'center'}} variant="h5" component="h2" >
        Invite the participant via Mail
        </Typography>
        <TextField
          style={{ margin: "10px 10px 5px 10px", width: "400px" }}
          className="outlinedbasic"
          label="Enter the Meet Name"
          variant="outlined"
          name="meet"
          onChange={createMeetName}
        />
        <TextField
          style={{ margin: "10px 10px 5px 10px", width: "400px" }}
          className="outlinedbasic"
          label="Enter the participant Email"
          variant="outlined"
          name="name"
          onChange={createName}
        />
      </CardContent>

      <CardActions>
        <Button
          style={{
            margin: "10px 10px 5px 10px",
            padding: "8px",
            width: "400px",
          }}
          color="primary"
          size="small"
          variant="contained"
          onClick={meetId}
        >
          Invite
        </Button>
      </CardActions>
    </Card>
  );
};

export default Iframejitsiinvite;
