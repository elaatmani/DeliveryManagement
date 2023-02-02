export default function errorHandler(err) {
    const code = err?.response?.data?.code;

    switch (code) {
        case 'SERVER_ERROR':
            this.$alert({
            })
            break;
    
        default:
            break;
    }
    console.log(err);
    console.log(code);

}