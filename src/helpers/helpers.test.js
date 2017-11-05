import { getFullApiUrl, getUniqueID, getRandomColor } from './';

const api = 'https://lab.lectrum.io/feed';
const groupID = 'l1lz1az2m5';
const errorMes = 'api and group id is not a string';
let id = '';
let color = '';

describe('helpers: getFullApiUrl', () => {
    test('getFullApiUrl should be function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl should give error if not string param', () => {
        function getFullApiUrlWithError () {
            getFullApiUrl(null, 1);
        }
        expect(getFullApiUrlWithError).toThrowError(errorMes);
    });

    test('getFullApiUrl should return full url if everything is good', () => {
        expect(getFullApiUrl(api, groupID)).toBe(`$(api)/$(groupID)`);
    });

});

describe('helpers: getUniqueID', () => {
    test('id should be string', () => {
        id = getUniqueID();
        expect(typeof id).toBe('string');
    });

    test('id should return error if param is string', () => {
        expect(getUniqueID('string').length).toBe(0);
    });

});

describe('helpers: getRandomColor', () => {
    color = getRandomColor();
    test('id should be string', () => {
        expect(typeof color).toBe('string');
    });

    test('color should be 7 symbols', () => {
        expect(color.length).toBe(7);
    });

    test('color should have first "#" symbols', () => {
        expect(color.charCodeAt(0)).toBe(35);
    });

});
