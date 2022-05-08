import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import { MdLocationOn, MdPhone, MdMailOutline } from "react-icons/md";
import "./About.css";

const containerStyle = {
  width: "100%",
  height: "50rem",
};

const center = {
  lat: 16.0821,
  lng: 108.23582,
};

const Location = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXd-ROF17VZ0g7SSAP06Rc2UwBM1J83go",
  });
  console.log(isLoaded, "isLoaded");
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div style={{ padding: "130px" }} className="body">
      <div className="left-side">
        <div className="content">
          <h2 class="animate-charcter">Info & Location</h2>
          <p style={{ color: "#000000" }}>
            Below is the information to help you contact me.
          </p>

          {/* Mail */}
          <p style={{ color: "#000000" }}>
            <MdMailOutline
              style={{
                width: "25px",
                height: "25px",
                fill: "#1E90FF",
                verticalAlign: 'middle',
              }}
            />
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 6px 0px 4px",
              }}
            >
              Gmail:
            </span>
            anhlptgcd18651@gmail.com
          </p>

          {/* Phone */}
          <p style={{ color: "#000000" }}>
            <MdPhone
              style={{
                width: "25px",
                height: "25px",
                fill: "#1E90FF",
                verticalAlign: 'middle',
              }}
            />
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 6px 0px 4px",
              }}
            >
              Phone:
            </span>
            0962731018
          </p>

          {/* Location */}
          <p style={{ color: "#000000" }}>
            <MdLocationOn
              style={{
                width: "25px",
                height: "25px",
                fill: "#1E90FF",
                verticalAlign: 'middle',
              }}
            />
            <span
              style={{
                color: "#00796b",
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0px 6px 0px 4px",
              }}
            >
              Location:
            </span>
            Đại học Greenwich Việt Nam 658 Ng. Quyền An Hải Bắc Sơn Trà Đà Nẵng
            550000, Việt Nam
          </p>
        </div>
        <div className="help-text"></div>
      </div>
      <div className="form-map">
        <div className="content">
          {isLoaded === true ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <></>
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
