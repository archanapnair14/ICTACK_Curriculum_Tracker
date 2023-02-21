import React from 'react'
import Sidemenu from './Dashboard'
import { Box } from '@mui/system'

const Page = () => {
  return (
<>
<Box sx={{display:"flex",backgroundColor:'beige',height:900}}>

<Sidemenu/>
</Box>
</>  )
}

export default Page