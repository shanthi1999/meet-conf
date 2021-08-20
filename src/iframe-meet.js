import React,{useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";


const Iframemeetframe = () => {
    const [meetname,setmeetname] = useState();
    var   {  meetid  } = useParams();

    useEffect(() => {
        setmeetname(meetid)   
    }, [meetid])

    return (
        <div>
            <iframe src={`https://8x8.vc/pheonix/${meetname}`} allow="camera;microphone;fullscreen;display-capture" height="750" width="100%" title="Iframe Example"></iframe>
        </div>
    );
};


export default Iframemeetframe;