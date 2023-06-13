import styled from "@/components/styled-components";

// import { DialogTitle } from "@/components/mui/material";
const DialogTitle=styled.div```

```
const MyDiv=({children,...other})=>{
    return <DialogTitle {...other}>{children}</DialogTitle>
}
export default MyDiv;