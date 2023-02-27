import Handlebars from 'handlebars/dist/handlebars.runtime';
import {renderDOM} from './src/utils/router';


Handlebars.registerHelper('switch', function(value: any, options: any) {
    this.switch_value = value;
    return options.fn(this);
});

Handlebars.registerHelper('case', function(value: any, options: any) {
    if (value == this.switch_value) {
        return options.fn(this);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderDOM('signUp');
});
