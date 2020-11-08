
import React from 'react';

function Loading() {
    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div className="spinner-grow" role="status">
                <span className="sr-only">Lo...</span>
            </div>
        </div>
    )
}

export default Loading;