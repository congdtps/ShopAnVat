
// Lấy giữ liệu của mảng items bên reudex
export const selectorsItems=()=>{
    return state=>state.items
}


// Lấy giữ liệu của mảng api bên reudex
export const selectorsApi=()=>{
    return state=>state.api
}



// Lấy giữ liệu của mảng detailApi bên reudex
export const selectorsApiDetail=()=>{
    return state=>state.detailApi
}
