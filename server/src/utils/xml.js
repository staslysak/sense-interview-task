import convert from 'xml-js';

const options = {
    compact: true,
    spaces: 2,
};

export const xml2js = (xml) => convert.xml2js({ root: xml }, { ...options });

export const js2xml = (js) => {
    const xml = convert.js2xml({ root: js }, { ...options });
    return xml;
};
