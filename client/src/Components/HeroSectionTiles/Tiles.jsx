import React from 'react'
import './Tiles.css'
// import {} from 'react-router-dom'
import {Box,Link} from '@chakra-ui/react'


function Tiles() {
  return (
    <Box className='Tile-Wrapper'>
      <TilesContainer/>
    </Box>
  )
}


const TilesContainer=()=>{
    return(<Box className='Tiles-Container'>
          <Box className='TilesRow'>
        <CarpenterTile/>
        <PharmacyTile/>
        <TransporterTile/>
       </Box>
       <Box className='TilesRow'>
           <HairdresserTile/>
            <MaidTile/>
            <Plumber/>
       </Box>
    </Box>)
}
const CarpenterTile=()=>{
    return(
    <Link href='/profiles/Carpenters'>
      <div className='Carpenter rd'>
         <p className='TileText'>Carpenters</p>
      </div>
    </Link>
    )

}
const PharmacyTile=()=>{
    return(
        <Link href='/profiles/Pharmacy'>
         <div className='Pharmacy rd'>
             <p className='TileText'>Pharmacy</p>
         </div>
        </Link>
    )
    
    }
const TransporterTile=()=>{
    return(
        <Link  href='/profiles/Transporter'>
          <div className='Transporter rd'>
             <p className='TileText'>Transporters</p>
         </div>
          
        </Link>
        )}
 const HairdresserTile=()=>{
    return(
        <Link href='/profiles/Hairdressers'>
          <div className='Hairdresser rd'>
             <p className='TileText'>HairDressers</p>
         </div>
        </Link>
    )
            
}
 const MaidTile=()=>{
    return(
        <Link  href='/profiles/Househelps'>
          <div className='Maid rd'>
             <p className='TileText'>House Maids</p>
         </div>
        </Link>
    )
                
 }

const Plumber=()=>{
    return(
        <Link  href='/profiles/Plumber'>
          <div className='Plumber rd'>
             <p className='TileText'>Plumbers</p>
          </div>
        </Link>
    )
                    
}



export default Tiles
