import { useRef, useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

export default function MapPart({ latitude, longitude }) {
    const containerRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);


    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
            setHeight(containerRef.current.offsetHeight)
        }
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            {width > 0 && (
                <Map
                    provider={osm}
                    width={width}
                    height={height}
                    center={[latitude, longitude]}
                    defaultZoom={15}
                >
                    <Marker
                        width={50}
                        color="green"
                        anchor={[latitude, longitude]}
                    />
                </Map>
            )}
        </div>
    );
}