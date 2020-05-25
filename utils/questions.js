class Question {
    constructor(type, name, message, defaultValues, choices, validate, filter, transformer, when, pageSize, prefix, suffix, askAnswered) {
        this.type = type;
        this.name = name;
        this.message = message;
        this.defaultValues = defaultValues;
        this.choices = choices;
        this.validate = validate;
        this.filter = filter;
        this.transformer = transformer;
        this.when = when;
        this.pageSize = pageSize;
        this.prefix = prefix;
        this.suffix = suffix;
        this.askAnswered = askAnswered;
    }
}

module.exports = Question;