import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "400px",
};

const center = {
	lat: 35.221171,
	lng: -97.442225,
};

const lib = ["places"];
const id = ["2bdc4ba0977961b5"];
const key = "AIzaSyBOL4VoyT8pSqKPa_2AuvIjNAC9OR5GT4E";

const OfficeMap = React.memo(function OfficeMap() {
	return (
		<LoadScript googleMapsApiKey={key} libraries={lib} mapIds={id}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} options={{ mapId: "2bdc4ba0977961b5" }}>
				<Marker
					position={{
						lat: 35.221171,
						lng: -97.442225,
					}}
				/>
			</GoogleMap>
		</LoadScript>
	);
});

export { OfficeMap };
