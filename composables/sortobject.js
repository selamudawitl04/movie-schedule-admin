
export default function (sortBy, order) {
    if(sortBy == "title"){
        return {
            title: order
        }
    }
    else if(sortBy == "rating"){
        return {
            rating_average: order
        }
    }
    else if(sortBy == "duration"){
        return {
            duration: order
        }
    }else{
        return{
            date: order

            
        }
    }


}