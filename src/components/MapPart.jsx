import { Map, Marker } from "pigeon-maps"
import { osm } from 'pigeon-maps/providers'

import { Box } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';

export default function MapPart({ latitude, longitude }) {
    return (
        <Box sx={{ width: "100%", height: '100%' }}>
            <Map
                provider={osm}
                height={200}
                // width={400}
                center={[latitude, longitude]}
                defaultZoom={15}
            >
                <Marker
                    width={50}
                    color="green"
                    anchor={[latitude, longitude]}
                >
                </Marker>
            </Map>
        </Box>


    );
}