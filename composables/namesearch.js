// this function convert search input value to first name and last name
export default function (name){
    let first_name = name;
    let last_name = name
    if(name.split(' ').length > 1){
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1]
    }
    return {
        first_name: `%${first_name}%`,
        last_name: `%${last_name}%` 
    }
}