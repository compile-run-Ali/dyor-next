import React from 'react' // imports the React library 
export default function DexScreener({ chartAddress, networkName }) { // exports the DexScreener function which takes two parameters - chartAddress and networkName
    return ( // returns the following JSX code
        <iframe
            title="Charts from Dexscreener" // title of the iframe
            src={`https://dexscreener.com/${networkName}/${chartAddress}?embed=1&trades=0&info=0&theme=dark`} // source of the iframe
            className="fit" // class name for the iframe
            scrolling='no' // sets scrolling to no
            style={{ width: "100%", height: "100%", display: 'block' }} // sets the width and height of the iframe to 100% and displays it as a block
        />
    )
}