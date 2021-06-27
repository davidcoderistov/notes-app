

const isNonEmptyString = value => value && typeof value === 'string' && value.trim().length > 0;


export { isNonEmptyString }
