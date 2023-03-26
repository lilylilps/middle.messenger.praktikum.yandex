module.exports =  function(value: any, options: any) {
    if (value == this.switch_value) {
        return options.fn(this);
    }
};
