import * as real from './real';
import * as mock from './mock';

export const users = () => {
    return process.env.NODE_ENV === 'test' ? mock : real;
}