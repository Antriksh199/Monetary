import { AbstractControl, ValidationErrors } from '@angular/forms';

export function NameValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^[A-Za-z\s]+$/.test(value)))
        {
            errors["text"]= "Incorrect Name, Only letters & Space allowed";

            if(value.length < 6 && value.length > 12)
        {
        errors["lengthError"] = "Only 6 to 20 characters allowed";
        }
        }

    }
    else
    {
        errors["required"] = "Name is required.";
    }

    return Object.keys(errors).length ? errors : null;
}

export function ProviderValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^[A-Za-z\s]+$/.test(value)))
        {
            errors["text"]= "Incorrect Provider, Only letters & Space allowed";

            if(value.length < 6 && value.length > 12)
        {
        errors["lengthError"] = "Only 6 to 20 characters allowed";
        }
        }

    }
    else
    {
        errors["required"] = "Provider is required.";
    }

    return Object.keys(errors).length ? errors : null;
}


export function CardNumberValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^\d{4}$/.test(value)))
        {
            errors['invalidNumber'] = "Only 4 digits allowed.";
        }

    }
    else
    {
        errors["required"] = "Card Number is required.";
    }

    return Object.keys(errors).length ? errors : null;
}
export function AccountNumberValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^\d+$/.test(value)))
        {
            errors['invalidNumber'] = "Invalid Account Number.";
        }

    }
    else
    {
        errors["required"] = "Account Number is required.";
    }

    return Object.keys(errors).length ? errors : null;
}

export function CvvValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^\d{3}$/.test(value)))
        {
            errors["invalidNumber"] = "Only 3 digit CVV allowed.";
        }

    }
    else
    {
        errors["required"] = "CVV is required.";
    }

    return Object.keys(errors).length ? errors : null;
}

export function CardExpiryValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)))
        {
            errors["invalidNumber"] = "Date should be in MM/YY format. eg. 08/25";
        }
        else
        {
            const [datemonthstr, dateyearstr] = value.split("/");
            const year = parseInt(dateyearstr) + 2000;
            const month = parseInt(datemonthstr);
            const expiryDate = new Date(year, month, 0, 23, 59, 59 ); // 0th day of next month = last day of this month
            const currDate = new Date();

            if(expiryDate < currDate)
            errors["expiredCard"] = "Card has already expired.";
        }

    }
    else
    {
        errors["required"] = "CVV is required.";
    }

    return Object.keys(errors).length ? errors : null;
}

export function BankNameValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^[A-Za-z ]+$/.test(value)))
        {
            errors["invalidName"] = "Invalid Bank Name";
        }

    }
    else
    {
        errors["required"] = "Bank Name is required.";
    }

    return Object.keys(errors).length ? errors : null;
}

export function UPIValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(value)))
        {
            errors["invalidNumber"] = "Invalid UPI ID";
        }

    }
    else
    {
        errors["required"] = "UPI ID is required.";
    }

    return Object.keys(errors).length ? errors : null;
}

export function IFSCValidator(control: AbstractControl): ValidationErrors | null 
{

    const errors: ValidationErrors = {};
    const value = control.value.trim();

    if( value)
    {
        if(!(/^[A-Za-z]{3,6}\d{3,6}$/.test(value)))
        {
            errors["invalidNumber"] = "Invalid IFSC Code";
        }

    }
    else
    {
        errors["required"] = "IFSC is required.";
    }

    return Object.keys(errors).length ? errors : null;
}

