function Validator(option){
    var formElement = document.querySelector(option.form);
    var selectorRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }

            element = element.parentElement;
        }
    }
    
    function validate (inputElement, rule) {

        var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
        var rules =  selectorRules[rule.selector];

        for(var i = 0; i < rules.length ; ++i  ) {
            var errorMessage = rules[i](inputElement.value);
            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, option.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

  
    if (formElement) {
        
        formElement.onsubmit = function (e) {
            var isFormValid = true;
            e.preventDefault();

            option.rules.forEach( function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                
                if (!isValid) { 
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof option.onSubmit === 'function') {
                var enabledInputs = formElement.querySelectorAll('[name]:not([disabled])');
                var formValue = Array.from(enabledInputs).reduce(function (values, input) {
                    values[input.name] = input.value;
                    return values;
                },{});

                option.onSubmit(formValue);
                } else {
                    formElement.submit();
                }
            }
        }


        option.rules.forEach( function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = getParent(inputElement, option.formGroupSelector).querySelector(option.errorSelector);
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            if (inputElement) {
                inputElement.onblur = function () {
                   validate(inputElement,rule)
                }

                inputElement.onkeyup = function () {
                    errorElement.innerText = '';
                    getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
                 }

                 inputElement.onchange = function () {
                    errorElement.innerText = '';
                    getParent(inputElement, option.formGroupSelector).classList.remove('invalid');
                 }
            }

          
        });
    }

    
}; 

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này!'
        }
    }
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value.trim()) ? undefined : message ||  'Vui lòng nhập email!'
        }
    }
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            
            return value.length >= min ? undefined : message ||  `Mật khẩu có ít nhất ${min} ký tự!`;
        }
    }
};

Validator.isConfirmed = function (selector, confirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            
            return value === confirmValue() ? undefined : message || 'Giá trị nhập lại chưa chính xác!';
        }
    }
};