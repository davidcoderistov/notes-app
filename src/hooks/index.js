import { useState } from 'react';


const useFormValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleOnValueChange = event => {
        let fieldValue = '';
        if(event && event.target) {
            fieldValue = event.target.value;
        } else if(event) {
            fieldValue = event;
        }
        setValue(fieldValue);
    };

    return [value, handleOnValueChange]
};

export { useFormValue }
