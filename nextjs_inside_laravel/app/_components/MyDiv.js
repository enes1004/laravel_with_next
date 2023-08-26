'use client';
import styled from "styled-components";

// import { DialogTitle } from "@/app/_components/mui/material";
const DialogTitle=styled.div;
const MyDiv=({children,...other})=>{
    return <DialogTitle {...other}>{children}</DialogTitle>
}
export default MyDiv;