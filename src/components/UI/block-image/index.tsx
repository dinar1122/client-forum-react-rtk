import React, { useState } from "react";
import {Image} from "@nextui-org/react";

const BlockImage = ({ imageSource }: any) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div  onClick={toggleZoom} className="justify-center mt-5 mb-5 flex" style={{ cursor: 'pointer' }}>
            {isZoomed ? (
                <div style={{ position: 'fixed', top: '0', bottom: '0', left: '0', right: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: '999' }}>
                    <Image src={imageSource} alt="NextUI hero Image" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                </div>
            ) : (
                <Image src={imageSource} alt="NextUI hero Image" style={{ maxWidth: '500px', cursor: 'zoom-in' }} />
            )}
        </div>
    );
};

export default BlockImage;