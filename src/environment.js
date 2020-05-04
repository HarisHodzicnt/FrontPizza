export const api = "https://localhost:44309/api"
export const apiImage = "https://localhost:44309/Image"

export const validate = (data, size?, material?) => {
    console.log(size)
    console.log(material)
    let message = {prop:null, body:null}
    for (var prop in data) {
        switch (prop) {
            case "Name": {
                if (data[prop] == "" || data[prop] == "") {
                    message = { prop: prop, body: "Cant be empty" }
                    break;
                }
            }
            case "Quantity": {
                if (data[prop] == "" || parseInt(data[prop]) == NaN) {
                    message = { prop: prop, body: "Cant be empty and must be a number" }
                    break;
                }

            }
            case "Price":
                {
                    if (data[prop] == "" || parseInt(data[prop]) == NaN) {
                        message = { prop: prop, body: "Cant be empty and must be a number" }
                        break;
                    }

                }
            case "Size":
                {
                    if (data[prop] == "" || size?.includes(data[prop])) {
                        message = { prop: prop, body: "Cant be empty and must be in range of provided values " }
                        break;
                    }

                }
            case "Material":
                {
                    if (data[prop] == "" || material?.includes(data[prop])) {
                        message = { prop: prop, body: "Cant be empty and must be in range of provided values " }
                        break;
                    }

                }
        }
        return message;
    }
}