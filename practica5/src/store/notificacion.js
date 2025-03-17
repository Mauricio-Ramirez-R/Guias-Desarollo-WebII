export const createNotificacion = (set, get) => ({
    notification: null,
showNotification: (message,type='info')=>{
        set({
            notification:{
                message,
                type
            }
        });
        setTimeout(()=>{set({notification:null})},5000)
    }
})