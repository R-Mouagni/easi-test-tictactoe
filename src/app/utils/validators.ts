import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function maxUserCharsValidator(maxChars: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value === '') {
      return null;
    }

    const userChars = Array.from(control.value);
    return userChars.length <= maxChars ? null : {
      maxUserChars: {
        requiredLength: maxChars,
        actualLength: userChars.length
      }
    };
  };
}

export function fieldsMustDifferValidator(field1: string, field2: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control1 = group.get(field1);
    const control2 = group.get(field2);

    if (!control1 || !control2) return null;

    const value1 = control1.value;
    const value2 = control2.value;

    if (value1 && value2 && value1 === value2) {
      const error = {fieldsMustDiffer: true};

      control1.setErrors({...(control1.errors || {}), ...error});
      control2.setErrors({...(control2.errors || {}), ...error});

      return null;
    } else {
      if (control1.hasError('fieldsMustDiffer')) {
        const errors = {...(control1.errors || {})};
        delete errors['fieldsMustDiffer'];
        control1.setErrors(Object.keys(errors).length ? errors : null);
      }

      if (control2.hasError('fieldsMustDiffer')) {
        const errors = {...(control2.errors || {})};
        delete errors['fieldsMustDiffer'];
        control2.setErrors(Object.keys(errors).length ? errors : null);
      }

      return null;
    }
  };
}


