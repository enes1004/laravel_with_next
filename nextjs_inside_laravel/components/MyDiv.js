"use client"
const MyDiv=({children,...other})=>{
    return <div {...other}>{children}</div>
}
export default MyDiv;