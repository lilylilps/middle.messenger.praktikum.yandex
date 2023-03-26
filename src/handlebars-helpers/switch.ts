module.exports = function(value: any, options: any) {
    this.switch_value = value;
    return options.fn(this);
};
