import React from 'react';
import { Table } from 'react-bootstrap';


const my_getTime = (ms) => {
    ms = ms + '000';
    const date = new Date(+ms);
    let h = date.getHours();
    let m = date.getMinutes();
    if (h < 10) {
        h = '0' + h
    }
    if (m < 10) {
        m = '0' + m
    }
    console.log(h, m);
    return `${h}:${m}`;
};

const getDateNaw = () => {
    let time = new Date().getTime();
    let date = new Date(time);
    let arrMonth = ["Jan","Febr","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    let h = date.getHours();
    let mm = date.getMinutes();
    let m = date.getMonth();
    let d = date.getDate();
    if (h < 10) { h = '0' + h }
    if (mm < 10) { mm = '0' + mm }
    if (d < 10) { d = '0' + d }

    return `${h}:${mm}  ${arrMonth[m]} ${d}`;
};

export default(props) => {
    const town = props.town;
    return (
     <div>
       <div className="table_header">
           <h3><strong> Weather in {town.name}, {town.sys.country}</strong></h3>
           <p>
               {console.log(`../../assets/images/${town.weather[0].icon}.png`)}
               {/*<img src={(require(`../../assets/images/${town.weather[0].icon}.png`)}></img>*/}
               <img src={`https://openweathermap.org/img/w/${town.weather[0].icon}.png`} alt="img"></img>
               <strong>{town.main.temp} <sup>0</sup>C</strong></p>
           <p>{town.weather[0].description.charAt(0).toUpperCase() + town.weather[0].description.substr(1)}</p>
           <p>{getDateNaw()}</p>
       </div>



         <Table striped bordered condensed hover>
            <tbody>
             <tr>
                 <td>Wind</td>
                 <td>Gentle Breeze, {town.wind.speed} m/s, South-southwest ({town.wind.deg})
                </td>

             </tr>

             <tr>
                 <td>Cloudiness</td>
                 <td>Sky is {town.weather[0].main}</td>
             </tr>
             <tr>
                 <td>Pressure</td>
                 <td>{town.main.pressure} hpa</td>
             </tr>

             <tr>
                 <td>Humidity</td>
                 <td>{town.main.humidity} %</td>
             </tr>
             <tr>
                 <td>Sunrise</td>
                 <td>{my_getTime(town.sys.sunrise)}</td>
             </tr>

             <tr>
                 <td>Sunset</td>
                 <td>{my_getTime(town.sys.sunset)}</td>
             </tr>
             <tr>
                 <td>Geo coolds</td>
                 <td>[{town.coord.lat}, {town.coord.lon}]</td>
             </tr>
            </tbody>
         </Table>
     </div>
    )
};