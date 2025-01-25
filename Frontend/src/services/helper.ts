export const formatDate = (date : string):string  => {
    const returnDate = new Date(date);
    const year = returnDate.getUTCFullYear();
    const month = String(returnDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(returnDate.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
    
} 
